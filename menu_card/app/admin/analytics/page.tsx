"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { analyticsData } from "@/data/mock-data"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const { stats, revenueData, categoryData, popularItems, reservationData } = analyticsData

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="grid gap-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Tabs defaultValue="sales" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
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

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-semibold">Revenue Chart</div>
                    <p className="text-sm text-gray-500">
                      This is a placeholder for a revenue chart. In a real application, this would display a line chart
                      showing revenue trends over time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-semibold">Category Pie Chart</div>
                    <p className="text-sm text-gray-500">
                      This is a placeholder for a pie chart. In a real application, this would display a pie chart
                      showing sales distribution across different menu categories.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{index + 1}.</div>
                      <div>{item.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">{item.orders} orders</div>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full bg-amber-500"
                          style={{ width: `${(item.orders / popularItems[0].orders) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservations by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-semibold">Reservations Bar Chart</div>
                    <p className="text-sm text-gray-500">
                      This is a placeholder for a bar chart. In a real application, this would display a bar chart
                      showing reservation counts for each day of the week.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sales & Reservations Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-lg font-semibold">Combined Trend Chart</div>
                  <p className="text-sm text-gray-500">
                    This is a placeholder for a combined line chart. In a real application, this would display a chart
                    showing both sales and reservation trends over time, allowing for comparison between the two
                    metrics.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
