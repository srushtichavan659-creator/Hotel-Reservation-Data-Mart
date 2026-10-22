import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Database,
  Network,
  CalendarDays,
  BarChart3,
  Ban,
  Users,
  Brain,
  Lightbulb,
  FlaskConical,
  Menu,
  RefreshCw,
  Table2,
  KeyRound,
  Link2,
  Calculator,
  WalletCards,
  CreditCard,
  Hotel,
  UserRound,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./App.css";

type Page =
  | "Dashboard"
  | "Data Exploration"
  | "Data Mart Design"
  | "Booking Analysis"
  | "Revenue Analysis"
  | "Cancellation Analysis"
  | "Customer Segmentation"
  | "Prediction"
  | "Insights"
  | "Experiments Lab";

type DashboardData = {
  totalBookings: number;
  canceledBookings: number;
  cancellationRate: number;
  averageDailyRate: number;
  monthlyBookings: { month: string; bookings: number }[];
};

const revenueData = [
  { month: "Jul", revenue: 1280000 },
  { month: "Aug", revenue: 1510000 },
  { month: "Sep", revenue: 1080000 },
  { month: "Oct", revenue: 1160000 },
  { month: "Nov", revenue: 690000 },
  { month: "Dec", revenue: 720000 },
  { month: "Jan", revenue: 640000 },
  { month: "Feb", revenue: 850000 },
  { month: "Mar", revenue: 1090000 },
  { month: "Apr", revenue: 1210000 },
  { month: "May", revenue: 1340000 },
  { month: "Jun", revenue: 1190000 },
];

const bookingStatusData = [
  { name: "Confirmed", value: 75166 },
  { name: "Canceled", value: 44224 },
];

const channelData = [
  { channel: "Online TA", bookings: 56420 },
  { channel: "Offline TA", bookings: 12480 },
  { channel: "Direct", bookings: 10950 },
  { channel: "Corporate", bookings: 7250 },
  { channel: "Other", bookings: 12290 },
];

const COLORS = ["#10b981", "#fb3155"];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Data Exploration", icon: Database },
  { label: "Data Mart Design", icon: Network },
  { label: "Booking Analysis", icon: CalendarDays },
  { label: "Revenue Analysis", icon: BarChart3 },
  { label: "Cancellation Analysis", icon: Ban },
  { label: "Customer Segmentation", icon: Users },
  { label: "Prediction", icon: Brain },
  { label: "Insights", icon: Lightbulb },
  { label: "Experiments Lab", icon: FlaskConical },
];

function App() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Data Exploration":
        return <DataExplorationPage />;
      case "Data Mart Design":
        return <DataMartPage />;
      case "Booking Analysis":
        return <BookingAnalysisPage />;
      case "Revenue Analysis":
        return <RevenueAnalysisPage />;
      case "Cancellation Analysis":
        return <CancellationPage />;
      case "Customer Segmentation":
        return <SegmentationPage />;
      case "Prediction":
        return <PredictionPage />;
      case "Insights":
        return <InsightsPage />;
      case "Experiments Lab":
        return <ExperimentsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "" : "sidebar-hidden"}`}>
        <div className="brand">
          <div className="brand-icon">
            <BarChart3 size={25} />
          </div>

          <div>
            <h2>Hotel Analytics</h2>
            <p>Data Mart System</p>
          </div>
        </div>

        <div className="menu-label">MAIN MENU</div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                className={`nav-item ${active ? "active" : ""}`}
                onClick={() => setActivePage(item.label as Page)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          Backend: Connected
        </div>
      </aside>

      <main className={`main ${sidebarOpen ? "" : "main-expanded"}`}>
        <header className="topbar">
          <button
            className="icon-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={21} />
          </button>

          <div className="breadcrumb">
            <span>Hotel Reservation</span>
            <b>/</b>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <div className="status">
              <span className="status-dot" />
              System Connected
            </div>

            <button
              className="icon-button"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={17} />
            </button>

            <div className="avatar">SC</div>
          </div>
        </header>

        <div className="content">
          {renderPage()}

          <div className="footer">
            Hotel Reservation Data Mart
            <span>•</span>
            Data Warehouse & Analytics
          </div>
        </div>
      </main>
    </div>
  );
}

/* ========================= DASHBOARD ========================= */

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBookings: 0,
    canceledBookings: 0,
    cancellationRate: 0,
    averageDailyRate: 0,
    monthlyBookings: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        return response.json();
      })
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="HOTEL RESERVATION DATA MART"
        title="Dashboard Overview"
        subtitle="Monitor bookings, cancellations and hotel performance."
      />

      <div className="banner">
        <div>
          <p>DATA MART ANALYTICS</p>
          <h2>Hotel Reservation Analytics Dashboard</h2>
          <span>
            Analyze booking behavior, revenue performance, cancellation
            patterns and customer information using a dimensional data mart.
          </span>
        </div>

        <div className="banner-icon">
          <Hotel size={42} />
        </div>
      </div>

      <div className="section-heading">
        <h2>Key Performance Indicators</h2>
        <span>
          {loading ? "Loading dataset..." : "Live dataset summary"}
        </span>
      </div>

      <div className="kpi-grid">
        <KpiCard
          icon={<CalendarDays />}
          title="Total Bookings"
          value={
            loading
              ? "..."
              : dashboardData.totalBookings.toLocaleString()
          }
          text="Total reservation records"
          type="pink"
        />

        <KpiCard
          icon={<Ban />}
          title="Canceled Bookings"
          value={
            loading
              ? "..."
              : dashboardData.canceledBookings.toLocaleString()
          }
          text="Reservations canceled"
          type="cyan"
        />

        <KpiCard
          icon={<BarChart3 />}
          title="Cancellation Rate"
          value={
            loading
              ? "..."
              : `${dashboardData.cancellationRate}%`
          }
          text="Percentage of cancellations"
          type="yellow"
        />

        <KpiCard
          icon={<Users />}
          title="Average Daily Rate"
          value={
            loading
              ? "..."
              : `€${dashboardData.averageDailyRate}`
          }
          text="Average daily room rate"
          type="purple"
        />
      </div>

      <div className="analysis-grid">
        <section className="panel">
          <PanelHeading
            title="Monthly Bookings"
            subtitle="Reservation distribution by month"
            icon={<BarChart3 />}
          />

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill="#10a05b"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <PanelHeading
            title="Booking Overview"
            subtitle="Dataset summary"
            icon={<Database />}
          />

          <div className="overview-list">
            <OverviewRow label="Dataset" value="Connected" />
            <OverviewRow label="Database" value="SQLite" />
            <OverviewRow
              label="Total records"
              value={
                loading
                  ? "..."
                  : dashboardData.totalBookings.toLocaleString()
              }
            />
            <OverviewRow label="Backend status" value="Connected" />
          </div>
        </section>
      </div>
    </>
  );
}

/* ========================= DATA EXPLORATION ========================= */

function DataExplorationPage() {
  return (
    <>
      <PageHeader
        eyebrow="DATA EXPLORATION"
        title="Data Exploration"
        subtitle="Explore the hotel reservation dataset and its attributes."
      />

      <div className="explore-grid">
        <InfoCard
          icon={<Database />}
          title="Dataset"
          value="Hotel Bookings"
          text="Reservation dataset used for analytics."
        />

        <InfoCard
          icon={<Table2 />}
          title="Records"
          value="119,390"
          text="Total reservation records."
        />

        <InfoCard
          icon={<Calculator />}
          title="Attributes"
          value="32+"
          text="Booking, customer, hotel and revenue attributes."
        />
      </div>

      <section className="panel table-panel">
        <PanelHeading
          title="Dataset Attributes"
          subtitle="Important columns used in the data mart"
          icon={<Table2 />}
        />

        <div className="data-table">
          <div className="table-head">
            <span>Attribute</span>
            <span>Type</span>
            <span>Description</span>
          </div>

          <TableRow
            name="hotel"
            type="Categorical"
            description="Type of hotel"
          />
          <TableRow
            name="arrival_date_year"
            type="Numeric"
            description="Arrival year"
          />
          <TableRow
            name="market_segment"
            type="Categorical"
            description="Booking market segment"
          />
          <TableRow
            name="lead_time"
            type="Numeric"
            description="Days between booking and arrival"
          />
          <TableRow
            name="adr"
            type="Numeric"
            description="Average daily room rate"
          />
          <TableRow
            name="is_canceled"
            type="Binary"
            description="Cancellation indicator"
          />
        </div>
      </section>
    </>
  );
}

/* ========================= DATA MART ========================= */

function DataMartPage() {
  return (
    <>
      <PageHeader
        eyebrow="DATA WAREHOUSE / STAR SCHEMA"
        title="Data Mart Design"
        subtitle="Hotel Reservation Data Mart dimensional model."
      />

      <div className="schema-card">
        <div className="schema-title">
          <Network size={18} />
          <span>HOTEL RESERVATION DATA MART</span>
        </div>

        <div className="schema-grid">
          <SchemaDimension
            position="customer"
            icon={<UserRound />}
            title="Dim Customer"
            fields={[
              "customer_key",
              "customer_type",
              "market_segment",
              "country",
              "customer_status",
            ]}
          />

          <SchemaDimension
            position="hotel"
            icon={<Hotel />}
            title="Dim Hotel"
            fields={[
              "hotel_key",
              "hotel_type",
              "hotel_name",
              "hotel_location",
              "hotel_category",
            ]}
          />

          <SchemaDimension
            position="date"
            icon={<CalendarDays />}
            title="Dim Date"
            fields={[
              "date_key",
              "arrival_date",
              "arrival_month",
              "arrival_year",
              "season",
            ]}
          />

          <div className="fact-table">
            <div className="table-badge">FACT TABLE</div>

            <div className="fact-header">
              <div className="fact-icon">
                <Database size={22} />
              </div>
              <h2>Fact Booking</h2>
            </div>

            <p className="fact-description">
              Central table storing measurable booking transactions.
            </p>

            <div className="fact-fields">
              {[
                "booking_key",
                "customer_key",
                "hotel_key",
                "date_key",
                "booking_status",
                "lead_time",
                "stays_in_nights",
                "adults",
                "children",
                "adr",
                "revenue",
                "is_canceled",
              ].map((field) => (
                <div className="fact-field" key={field}>
                  <span
                    className={
                      field.endsWith("_key") ? "key-symbol" : "field-symbol"
                    }
                  >
                    {field.endsWith("_key") ? (
                      <KeyRound size={12} />
                    ) : (
                      "•"
                    )}
                  </span>
                  {field}
                </div>
              ))}
            </div>
          </div>

          <SchemaDimension
            position="booking"
            icon={<CreditCard />}
            title="Dim Booking"
            fields={[
              "booking_key",
              "booking_channel",
              "deposit_type",
              "customer_type",
              "booking_status",
            ]}
          />

          <SchemaDimension
            position="payment"
            icon={<WalletCards />}
            title="Dim Payment"
            fields={[
              "payment_key",
              "deposit_type",
              "payment_method",
              "deposit_amount",
              "payment_status",
            ]}
          />
        </div>

        <div className="schema-legend">
          <span>
            <KeyRound size={13} /> Primary Key
          </span>
          <span>
            <Link2 size={13} /> Foreign Key
          </span>
          <span>
            <Database size={13} /> Fact Table
          </span>
          <span>
            <Network size={13} /> Dimension Table
          </span>
        </div>
      </div>

      <div className="schema-info-grid">
        <InfoCard
          icon={<Database />}
          title="Fact Booking"
          value="12 attributes"
          text="Stores measurable booking transactions such as ADR, revenue, nights and cancellation."
        />

        <InfoCard
          icon={<Network />}
          title="Dimension Tables"
          value="5 dimensions"
          text="Customer, Hotel, Date, Booking and Payment dimensions provide descriptive context."
        />

        <InfoCard
          icon={<TrendingUp />}
          title="Analytics Ready"
          value="Star Schema"
          text="Supports booking, revenue and cancellation analysis efficiently."
        />
      </div>
    </>
  );
}

function SchemaDimension({
  position,
  icon,
  title,
  fields,
}: {
  position: string;
  icon: React.ReactNode;
  title: string;
  fields: string[];
}) {
  return (
    <div className={`dimension-card ${position}`}>
      <div className="dimension-top">
        <div className="dimension-icon">{icon}</div>
        <div>
          <div className="dimension-label">DIMENSION</div>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="dimension-fields">
        {fields.map((field, index) => (
          <div key={field} className="dimension-field">
            {index === 0 ? (
              <KeyRound size={12} className="key-symbol" />
            ) : (
              <span>•</span>
            )}
            {field}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= BOOKING ANALYSIS ========================= */

function BookingAnalysisPage() {
  return (
    <>
      <PageHeader
        eyebrow="BOOKING ANALYSIS"
        title="Booking Analysis"
        subtitle="Analyze reservation volume, booking channels and booking status."
      />

      <div className="kpi-grid">
        <KpiCard
          icon={<CalendarDays />}
          title="Total Bookings"
          value="119,390"
          text="All reservation records"
          type="pink"
        />
        <KpiCard
          icon={<CheckCircle2 />}
          title="Confirmed"
          value="75,166"
          text="Non-canceled bookings"
          type="cyan"
        />
        <KpiCard
          icon={<Ban />}
          title="Canceled"
          value="44,224"
          text="Canceled reservations"
          type="yellow"
        />
        <KpiCard
          icon={<TrendingUp />}
          title="Cancellation Rate"
          value="37.04%"
          text="Overall cancellation percentage"
          type="purple"
        />
      </div>

      <div className="analysis-grid">
        <section className="panel">
          <PanelHeading
            title="Bookings by Channel"
            subtitle="Distribution of reservations across booking channels"
            icon={<BarChart3 />}
          />

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill="#10a05b"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <PanelHeading
            title="Booking Status"
            subtitle="Confirmed vs canceled"
            icon={<Ban />}
          />

          <div className="pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {bookingStatusData.map((item, index) => (
                    <Cell key={item.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
}

/* ========================= REVENUE ANALYSIS ========================= */

function RevenueAnalysisPage() {
  return (
    <>
      <PageHeader
        eyebrow="REVENUE ANALYSIS"
        title="Revenue Analysis"
        subtitle="Analyze hotel revenue, ADR and monthly revenue trends."
      />

      <div className="kpi-grid">
        <KpiCard
          icon={<WalletCards />}
          title="Total Revenue"
          value="€11.47M"
          text="Estimated booking revenue"
          type="pink"
        />
        <KpiCard
          icon={<BarChart3 />}
          title="Average ADR"
          value="€101.83"
          text="Average daily rate"
          type="cyan"
        />
        <KpiCard
          icon={<TrendingUp />}
          title="Peak Revenue"
          value="€1.51M"
          text="Highest monthly revenue"
          type="yellow"
        />
        <KpiCard
          icon={<Hotel />}
          title="Revenue Records"
          value="119,390"
          text="Booking transactions analyzed"
          type="purple"
        />
      </div>

      <section className="panel revenue-panel">
        <PanelHeading
          title="Monthly Revenue"
          subtitle="Revenue trend across the reservation period"
          icon={<TrendingUp />}
        />

        <div className="large-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  `€${Number(value).toLocaleString()}`
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ff5270"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="info-banner">
        <div className="info-banner-icon">
          <Calculator size={22} />
        </div>

        <div>
          <h3>Revenue Calculation</h3>
          <p>
            Revenue is calculated using Average Daily Rate (ADR) multiplied by
            the number of nights stayed. This helps identify high-value
            booking periods and hotel performance.
          </p>
        </div>
      </div>
    </>
  );
}

/* ========================= CANCELLATION ========================= */

function CancellationPage() {
  return (
    <>
      <PageHeader
        eyebrow="CANCELLATION ANALYSIS"
        title="Cancellation Analysis"
        subtitle="Understand cancellation behavior and reservation risk."
      />

      <div className="kpi-grid">
        <KpiCard
          icon={<Ban />}
          title="Canceled Bookings"
          value="44,224"
          text="Reservations canceled"
          type="pink"
        />

        <KpiCard
          icon={<TrendingUp />}
          title="Cancellation Rate"
          value="37.04%"
          text="Overall cancellation rate"
          type="yellow"
        />

        <KpiCard
          icon={<CalendarDays />}
          title="Total Bookings"
          value="119,390"
          text="Reservation records"
          type="cyan"
        />

        <KpiCard
          icon={<Brain />}
          title="Risk Indicator"
          value="Moderate"
          text="Based on cancellation proportion"
          type="purple"
        />
      </div>

      <section className="panel">
        <PanelHeading
          title="Cancellation Overview"
          subtitle="Booking status distribution"
          icon={<Ban />}
        />

        <div className="cancel-layout">
          <div className="cancel-stat">
            <div className="circle-value">37%</div>
            <p>Cancellation Rate</p>
          </div>

          <div className="cancel-points">
            <div>
              <span className="dot green" />
              <strong>75,166</strong>
              <p>Confirmed bookings</p>
            </div>

            <div>
              <span className="dot red" />
              <strong>44,224</strong>
              <p>Canceled bookings</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========================= SEGMENTATION ========================= */

function SegmentationPage() {
  return (
    <>
      <PageHeader
        eyebrow="CUSTOMER ANALYTICS"
        title="Customer Segmentation"
        subtitle="Group customers based on booking behavior using K-Means clustering."
      />

      <div className="segmentation-banner">
        <div>
          <span className="tag">K-MEANS CLUSTERING</span>
          <h2>Customer Behavior Segmentation</h2>
          <p>
            Customers are grouped using numerical booking features such as
            lead time, ADR and nights stayed.
          </p>
        </div>

        <div className="cluster-number">
          <small>SELECTED K</small>
          <strong>4</strong>
        </div>
      </div>

      <div className="cluster-grid">
        <ClusterCard
          number="01"
          title="Frequent Guests"
          customers="22,386"
          adr="€76"
          lead="25 days"
          rate="12%"
        />

        <ClusterCard
          number="02"
          title="High-Value Bookings"
          customers="27,758"
          adr="€110"
          lead="79 days"
          rate="19%"
        />

        <ClusterCard
          number="03"
          title="Early Planners"
          customers="31,204"
          adr="€98"
          lead="105 days"
          rate="28%"
        />

        <ClusterCard
          number="04"
          title="Short-Term Guests"
          customers="37,?42"
          adr="€94"
          lead="8 days"
          rate="42%"
        />
      </div>
    </>
  );
}

function ClusterCard({
  number,
  title,
  customers,
  adr,
  lead,
  rate,
}: {
  number: string;
  title: string;
  customers: string;
  adr: string;
  lead: string;
  rate: string;
}) {
  return (
    <div className="cluster-card">
      <div className="cluster-number-small">CLUSTER {number}</div>
      <h3>{title}</h3>

      <div className="cluster-row">
        <span>Customers</span>
        <strong>{customers}</strong>
      </div>

      <div className="cluster-row">
        <span>Average ADR</span>
        <strong>{adr}</strong>
      </div>

      <div className="cluster-row">
        <span>Lead Time</span>
        <strong>{lead}</strong>
      </div>

      <div className="cluster-row">
        <span>Cancellation</span>
        <strong>{rate}</strong>
      </div>
    </div>
  );
}

/* ========================= PREDICTION ========================= */

function PredictionPage() {
  return (
    <>
      <PageHeader
        eyebrow="PREDICTIVE ANALYTICS"
        title="Prediction"
        subtitle="Estimate cancellation risk using reservation attributes."
      />

      <div className="prediction-card">
        <div className="prediction-icon">
          <Brain size={34} />
        </div>

        <h2>Booking Cancellation Prediction</h2>

        <p>
          The prediction module can use booking information such as lead time,
          ADR, market segment, deposit type and previous cancellation behavior
          to estimate cancellation risk.
        </p>

        <div className="prediction-grid">
          <div>
            <span>Model</span>
            <strong>Classification</strong>
          </div>

          <div>
            <span>Target</span>
            <strong>is_canceled</strong>
          </div>

          <div>
            <span>Output</span>
            <strong>Risk Score</strong>
          </div>
        </div>
      </div>
    </>
  );
}

/* ========================= INSIGHTS ========================= */

function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="BUSINESS INTELLIGENCE"
        title="Insights"
        subtitle="Key findings generated from hotel reservation analytics."
      />

      <div className="insight-grid">
        <InsightCard
          number="01"
          title="High Cancellation Volume"
          text="A significant portion of reservations are canceled, making cancellation analysis important for hotel planning."
        />

        <InsightCard
          number="02"
          title="Revenue Fluctuation"
          text="Monthly revenue varies across the year, indicating seasonal differences in hotel demand."
        />

        <InsightCard
          number="03"
          title="Booking Channel Impact"
          text="Online travel agencies contribute a large share of bookings and can strongly influence reservation volume."
        />

        <InsightCard
          number="04"
          title="Customer Segments"
          text="K-Means clustering helps identify groups with different booking and cancellation behaviors."
        />
      </div>
    </>
  );
}

function InsightCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="insight-card">
      <div className="insight-number">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

/* ========================= EXPERIMENTS ========================= */

function ExperimentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="EXPERIMENTS LAB"
        title="Experiments Lab"
        subtitle="Test analytical models and data mining techniques."
      />

      <div className="experiment-grid">
        <ExperimentCard
          icon={<Brain />}
          title="K-Means Clustering"
          status="Available"
          description="Customer segmentation using behavioral features."
        />

        <ExperimentCard
          icon={<TrendingUp />}
          title="Revenue Forecast"
          status="Available"
          description="Analyze historical revenue trends."
        />

        <ExperimentCard
          icon={<Ban />}
          title="Cancellation Model"
          status="Planned"
          description="Predict the probability of booking cancellation."
        />
      </div>
    </>
  );
}

function ExperimentCard({
  icon,
  title,
  status,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  description: string;
}) {
  return (
    <div className="experiment-card">
      <div className="experiment-icon">{icon}</div>
      <span className="experiment-status">{status}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="primary-button">Open Experiment</button>
    </div>
  );
}

/* ========================= REUSABLE COMPONENTS ========================= */

function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="date-chip">Dataset: Hotel Bookings</div>
    </div>
  );
}

function KpiCard({
  icon,
  title,
  value,
  text,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  text: string;
  type: string;
}) {
  return (
    <div className={`kpi-card ${type}`}>
      <div className="kpi-top">
        <span>{title}</span>
        <div className="kpi-icon">{icon}</div>
      </div>

      <h2>{value}</h2>
      <p>{text}</p>
    </div>
  );
}

function PanelHeading({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="panel-heading">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <div className="panel-icon">{icon}</div>
    </div>
  );
}

function OverviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="overview-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <span>{title}</span>
      <h2>{value}</h2>
      <p>{text}</p>
    </div>
  );
}

function TableRow({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) {
  return (
    <div className="table-row">
      <strong>{name}</strong>
      <span>{type}</span>
      <p>{description}</p>
    </div>
  );
}

export default App;