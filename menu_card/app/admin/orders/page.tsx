"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { orders } from "@/data/mock-data"

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<any>(null)

  // Check if we should open the edit modal based on URL params
  useEffect(() => {
    const editOrderId = searchParams.get("edit")
    if (editOrderId) {
      const orderToEdit = orders.find((order) => order.id === editOrderId)
      if (orderToEdit) {
        setEditingOrder({ ...orderToEdit })
        setIsEditModalOpen(true)
      }
    }
  }, [searchParams])

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const handleEditOrder = () => {
    // In a real app, this would update the database
    // For now, we'll just show a success message
    alert(`Order ${editingOrder.id} has been updated successfully.`)
    setIsEditModalOpen(false)
    setEditingOrder(null)
  }

  const handleUpdateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = [...editingOrder.items]
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQuantity,
    }

    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setEditingOrder({
      ...editingOrder,
      items: updatedItems,
      total: newTotal,
    })
  }

  return (
    <AdminLayout title="Orders Management">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders by ID, customer name, or email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="whitespace-nowrap px-6 py-3">Order ID</th>
                    <th className="whitespace-nowrap px-6 py-3">Customer</th>
                    <th className="whitespace-nowrap px-6 py-3">Date</th>
                    <th className="whitespace-nowrap px-6 py-3">Total</th>
                    <th className="whitespace-nowrap px-6 py-3">Status</th>
                    <th className="whitespace-nowrap px-6 py-3">Payment</th>
                    <th className="whitespace-nowrap px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedOrder(order === selectedOrder ? null : order)}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{formatDate(order.date)}</td>
                      <td className="whitespace-nowrap px-6 py-4">${order.total.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{order.paymentMethod}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingOrder({ ...order })
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {selectedOrder && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Order Details: {selectedOrder.id}</h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Customer</h4>
                  <p>{selectedOrder.customer}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Order Date</h4>
                  <p>{formatDate(selectedOrder.date)}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Payment Method</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-1 text-sm font-medium text-gray-500">Delivery Address</h4>
                <p>{selectedOrder.address}</p>
              </div>

              {selectedOrder.notes && (
                <div className="mb-4">
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Notes</h4>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}

              <h4 className="mb-2 text-sm font-medium text-gray-500">Order Items</h4>
              <table className="mb-4 w-full">
                <thead>
                  <tr className="border-b text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="pb-2">Item</th>
                    <th className="pb-2 text-center">Quantity</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="py-3">{item.name}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-3 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t font-medium">
                    <td className="pt-3" colSpan={3}>
                      Total
                    </td>
                    <td className="pt-3 text-right">${selectedOrder.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => {
                    setEditingOrder({ ...selectedOrder })
                    setIsEditModalOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Order {editingOrder.id}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={editingOrder.customer}
                      onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={editingOrder.email}
                      onChange={(e) => setEditingOrder({ ...editingOrder, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editingOrder.phone}
                      onChange={(e) => setEditingOrder({ ...editingOrder, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingOrder.status.toLowerCase()}
                      onValueChange={(value) =>
                        setEditingOrder({ ...editingOrder, status: value.charAt(0).toUpperCase() + value.slice(1) })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={editingOrder.address}
                    onChange={(e) => setEditingOrder({ ...editingOrder, address: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={editingOrder.notes}
                    onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Order Items</Label>
                  <div className="mt-2 rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          <th className="px-4 py-2">Item</th>
                          <th className="px-4 py-2">Price</th>
                          <th className="px-4 py-2">Quantity</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editingOrder.items.map((item: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-2">
                              <div className="flex w-24 items-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-r-none"
                                  onClick={() => handleUpdateItemQuantity(index, item.quantity - 1)}
                                >
                                  <span className="sr-only">Decrease</span>
                                  <span>-</span>
                                </Button>
                                <div className="flex h-7 w-10 items-center justify-center border-y bg-white text-center">
                                  {item.quantity}
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-l-none"
                                  onClick={() => handleUpdateItemQuantity(index, item.quantity + 1)}
                                >
                                  <span className="sr-only">Increase</span>
                                  <span>+</span>
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="font-medium">
                          <td className="px-4 py-2" colSpan={3}>
                            Total
                          </td>
                          <td className="px-4 py-2 text-right">${editingOrder.total.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditOrder}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  )
}
