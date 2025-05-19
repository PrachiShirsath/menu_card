"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, DollarSign, Users, ShoppingBag, CalendarDays, Bell } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { analyticsData } from "@/data/mock-data"

export default function AdminDashboard() {
  const { stats, recentOrders, recentReservations } = analyticsData

  // Count pending reservations
  const pendingReservations = recentReservations.filter((res) => res.status === "Pending").length

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Pending Reservations Alert */}
        {pendingReservations > 0 && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-2">
                  <Bell className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Pending Reservations</h3>
                  <p className="text-sm text-amber-700">
                    You have {pendingReservations} reservations awaiting approval
                  </p>
                </div>
              </div>
              <Link href="/admin/reservations">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                  Review Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                {stat.title === "Total Revenue" && <DollarSign className="h-5 w-5 text-gray-500" />}
                {stat.title === "New Orders" && <ShoppingBag className="h-5 w-5 text-gray-500" />}
                {stat.title === "Reservations" && <CalendarDays className="h-5 w-5 text-gray-500" />}
                {stat.title === "New Customers" && <Users className="h-5 w-5 text-gray-500" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 flex items-center text-xs">
                  <span className="text-green-500">{stat.change}</span>
                  <span className="ml-1 text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Tabs defaultValue="orders">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="reservations" className="flex items-center gap-1">
                Recent Reservations
                {pendingReservations > 0 && (
                  <Badge variant="destructive" className="ml-1 bg-amber-500">
                    {pendingReservations}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Link href="/admin/orders">
                <Button variant="outline" size="sm" className="gap-1">
                  <span>All Orders</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/reservations">
                <Button variant="outline" size="sm" className="gap-1">
                  <span>All Reservations</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="whitespace-nowrap px-6 py-3">Order ID</th>
                        <th className="whitespace-nowrap px-6 py-3">Customer</th>
                        <th className="whitespace-nowrap px-6 py-3">Total</th>
                        <th className="whitespace-nowrap px-6 py-3">Status</th>
                        <th className="whitespace-nowrap px-6 py-3">Date</th>
                        <th className="whitespace-nowrap px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
                          <td className="whitespace-nowrap px-6 py-4">{order.customer}</td>
                          <td className="whitespace-nowrap px-6 py-4">{order.total}</td>
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
                          <td className="whitespace-nowrap px-6 py-4 text-gray-500">{order.date}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link href={`/admin/orders?edit=${order.id}`}>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="whitespace-nowrap px-6 py-3">Reservation ID</th>
                        <th className="whitespace-nowrap px-6 py-3">Customer</th>
                        <th className="whitespace-nowrap px-6 py-3">Guests</th>
                        <th className="whitespace-nowrap px-6 py-3">Date & Time</th>
                        <th className="whitespace-nowrap px-6 py-3">Status</th>
                        <th className="whitespace-nowrap px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentReservations.map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{reservation.id}</td>
                          <td className="whitespace-nowrap px-6 py-4">{reservation.customer}</td>
                          <td className="whitespace-nowrap px-6 py-4">{reservation.guests}</td>
                          <td className="whitespace-nowrap px-6 py-4">{reservation.date}</td>
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
                          <td className="whitespace-nowrap px-6 py-4">
                            {reservation.status === "Pending" ? (
                              <div className="flex gap-1">
                                <Link href={`/admin/reservations?approve=${reservation.id}`}>
                                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                    Approve
                                  </Button>
                                </Link>
                                <Link href={`/admin/reservations?reject=${reservation.id}`}>
                                  <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50">
                                    Reject
                                  </Button>
                                </Link>
                              </div>
                            ) : (
                              <Link href={`/admin/reservations?edit=${reservation.id}`}>
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
