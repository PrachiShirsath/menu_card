"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, Calendar, Pencil, Check, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { reservations } from "@/data/mock-data"

export default function ReservationsPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<any>(null)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [approveReservation, setApproveReservation] = useState<any>(null)
  const [rejectReservation, setRejectReservation] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  // Check URL params for actions
  useEffect(() => {
    const editId = searchParams.get("edit")
    const approveId = searchParams.get("approve")
    const rejectId = searchParams.get("reject")

    if (editId) {
      const reservationToEdit = reservations.find((res) => res.id === editId)
      if (reservationToEdit) {
        setEditingReservation({ ...reservationToEdit })
        setIsEditModalOpen(true)
      }
    }

    if (approveId) {
      const reservationToApprove = reservations.find((res) => res.id === approveId)
      if (reservationToApprove) {
        setApproveReservation({ ...reservationToApprove })
        setIsApproveModalOpen(true)
      }
    }

    if (rejectId) {
      const reservationToReject = reservations.find((res) => res.id === rejectId)
      if (reservationToReject) {
        setRejectReservation({ ...reservationToReject })
        setIsRejectModalOpen(true)
      }
    }
  }, [searchParams])

  // Filter reservations based on search term, status, and date
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || reservation.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDate = !dateFilter || new Date(reservation.date).toDateString() === dateFilter.toDateString()

    return matchesSearch && matchesStatus && matchesDate
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

  const handleEditReservation = () => {
    // In a real app, this would update the database
    alert(`Reservation ${editingReservation.id} has been updated successfully.`)
    setIsEditModalOpen(false)
    setEditingReservation(null)
  }

  const handleApproveReservation = () => {
    // In a real app, this would update the database
    alert(`Reservation ${approveReservation.id} has been approved successfully.`)
    setIsApproveModalOpen(false)
    setApproveReservation(null)
  }

  const handleRejectReservation = () => {
    // In a real app, this would update the database
    alert(`Reservation ${rejectReservation.id} has been rejected.`)
    setIsRejectModalOpen(false)
    setRejectReservation(null)
    setRejectionReason("")
  }

  return (
    <AdminLayout title="Reservations Management">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search reservations by ID, customer name, email, or phone..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" onClick={() => setDateFilter(undefined)}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {dateFilter && (
          <div className="flex items-center gap-2">
            <div className="text-sm">
              Filtering by date: <span className="font-medium">{format(dateFilter, "MMMM d, yyyy")}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setDateFilter(undefined)}>
              Clear
            </Button>
          </div>
        )}

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="whitespace-nowrap px-6 py-3">Reservation ID</th>
                    <th className="whitespace-nowrap px-6 py-3">Customer</th>
                    <th className="whitespace-nowrap px-6 py-3">Date & Time</th>
                    <th className="whitespace-nowrap px-6 py-3">Guests</th>
                    <th className="whitespace-nowrap px-6 py-3">Status</th>
                    <th className="whitespace-nowrap px-6 py-3">Occasion</th>
                    <th className="whitespace-nowrap px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedReservation(reservation === selectedReservation ? null : reservation)}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{reservation.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>{reservation.customer}</div>
                        <div className="text-xs text-gray-500">{reservation.phone}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{formatDate(reservation.date)}</td>
                      <td className="whitespace-nowrap px-6 py-4">{reservation.guests}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            reservation.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {reservation.occasion || "Not specified"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        {reservation.status === "Pending" ? (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => {
                                setApproveReservation({ ...reservation })
                                setIsApproveModalOpen(true)
                              }}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:bg-red-50"
                              onClick={() => {
                                setRejectReservation({ ...reservation })
                                setIsRejectModalOpen(true)
                              }}
                            >
                              <X className="mr-1 h-3 w-3" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setEditingReservation({ ...reservation })
                              setIsEditModalOpen(true)
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {selectedReservation && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reservation Details: {selectedReservation.id}</h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedReservation(null)}>
                  Close
                </Button>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Customer</h4>
                  <p>{selectedReservation.customer}</p>
                  <p className="text-sm text-gray-500">{selectedReservation.email}</p>
                  <p className="text-sm text-gray-500">{selectedReservation.phone}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Reservation Date & Time</h4>
                  <p>{formatDate(selectedReservation.date)}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Party Size</h4>
                  <p>{selectedReservation.guests} guests</p>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Occasion</h4>
                  <p>{selectedReservation.occasion || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">Special Requests</h4>
                  <p>{selectedReservation.specialRequests || "None"}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {selectedReservation.status === "Pending" ? (
                  <>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        setApproveReservation({ ...selectedReservation })
                        setIsApproveModalOpen(true)
                      }}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve Reservation
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => {
                        setRejectReservation({ ...selectedReservation })
                        setIsRejectModalOpen(true)
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject Reservation
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setEditingReservation({ ...selectedReservation })
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Reservation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Reservation Modal */}
        {editingReservation && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Reservation {editingReservation.id}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={editingReservation.customer}
                      onChange={(e) => setEditingReservation({ ...editingReservation, customer: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={editingReservation.email}
                      onChange={(e) => setEditingReservation({ ...editingReservation, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editingReservation.phone}
                      onChange={(e) => setEditingReservation({ ...editingReservation, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select
                      value={editingReservation.guests.toString()}
                      onValueChange={(value) =>
                        setEditingReservation({ ...editingReservation, guests: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger id="guests">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="occasion">Occasion</Label>
                    <Select
                      value={editingReservation.occasion || "not_specified"}
                      onValueChange={(value) =>
                        setEditingReservation({
                          ...editingReservation,
                          occasion: value === "not_specified" ? null : value,
                        })
                      }
                    >
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not_specified">Not specified</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="date">Date Night</SelectItem>
                        <SelectItem value="business">Business Meal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingReservation.status.toLowerCase()}
                      onValueChange={(value) =>
                        setEditingReservation({
                          ...editingReservation,
                          status: value.charAt(0).toUpperCase() + value.slice(1),
                        })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={editingReservation.specialRequests}
                    onChange={(e) => setEditingReservation({ ...editingReservation, specialRequests: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditReservation}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Approve Reservation Modal */}
        {approveReservation && (
          <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Reservation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>
                  Are you sure you want to approve the reservation for <strong>{approveReservation.customer}</strong> on{" "}
                  <strong>{formatDate(approveReservation.date)}</strong> for{" "}
                  <strong>{approveReservation.guests} guests</strong>?
                </p>
                <p className="mt-2 text-sm text-gray-500">An email confirmation will be sent to the customer.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" onClick={handleApproveReservation}>
                  <Check className="mr-2 h-4 w-4" />
                  Approve Reservation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Reject Reservation Modal */}
        {rejectReservation && (
          <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Reservation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>
                  Are you sure you want to reject the reservation for <strong>{rejectReservation.customer}</strong> on{" "}
                  <strong>{formatDate(rejectReservation.date)}</strong>?
                </p>
                <div className="mt-4">
                  <Label htmlFor="rejectionReason">Reason for Rejection (Optional)</Label>
                  <Textarea
                    id="rejectionReason"
                    placeholder="Provide a reason for the customer"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    This reason will be included in the email sent to the customer.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleRejectReservation}>
                  <X className="mr-2 h-4 w-4" />
                  Reject Reservation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  )
}
