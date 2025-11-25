# GOOD TEAM CRM - Interaction Design

## Core User Flows

### 1. Authentication & Role-Based Access
- **Login System**: Users authenticate with email/password
- **Role Detection**: System automatically redirects to appropriate dashboard based on role
- **Session Management**: Persistent login with secure token handling

### 2. TTC Operator Workflow
- **Lead Creation Form**: 
  - Timestamp auto-filled
  - Manager selection dropdown
  - Required fields: Lead Name, Phone Number
  - Optional fields: Chat ID, GEO, Stage, Individual Request, Call Source
  - Payment amount field with currency selector
- **Lead Management**: 
  - View personal leads in table format
  - Edit leads inline or via modal
  - Mark payment status (Paid/Unpaid)
  - Filter by date, status, payment
- **Real-time Notifications**: 
  - Instant notification when call center processes their leads
  - Visual indicators for lead status changes

### 3. Call Center Operator Workflow
- **Lead Assignment View**: 
  - Dashboard shows assigned leads from TTC operators
  - Priority indicators for urgent leads
  - Payment status visibility
- **Call Processing Interface**:
  - Lead details display with contact info
  - Call attempt tracking (Attempt 1, 2, 3, etc.)
  - Status buttons: Done, Busy, No Answer
  - Notes field for call details
  - Result submission with timestamp
- **Script Access**: 
  - Quick access to relevant scripts based on lead type
  - Searchable script database

### 4. Admin Workflow
- **User Management**:
  - Add/edit/delete operators
  - Role assignment interface
  - Salary rate configuration
  - Account status management
- **System Overview**:
  - Real-time dashboard with key metrics
  - Lead volume tracking
  - Conversion rate monitoring
  - Attendance overview
- **Revenue Tracking**:
  - View paid leads and amounts
  - Monthly revenue reports
  - Operator performance metrics

### 5. Cross-Functional Features
- **Attendance System**:
  - Clock in/out button on all dashboards
  - Automatic time tracking
  - Calendar view for history
- **Chat System**:
  - Real-time messaging between operators
  - Online status indicators
  - Message notifications with sound alerts
- **Notification Center**:
  - Bell icon with unread count
  - Notification types: New leads, status updates, messages
  - Mark as read functionality

### 6. Data Flow & Status Tracking
- **Lead Lifecycle**:
  1. TTC creates lead → Lead appears in Call Center queue
  2. Call Center processes lead → Status updates sent to TTC
  3. Call Center submits results → TTC receives notification
  4. If paid → Lead moves to revenue tracking
- **Audit Trail**:
  - History tracking for all actions
  - User attribution with timestamps
  - Change logs for lead modifications

### 7. Interactive Components
- **Dynamic Tables**: Sortable, filterable, searchable
- **Modal Forms**: For lead editing, user management
- **Real-time Updates**: Live data refresh without page reload
- **Drag & Drop**: File uploads, lead assignment (future enhancement)
- **Voice Notes**: Audio recording for call notes (future enhancement)

## User Experience Priorities
1. **Speed**: Instant form submissions and data updates
2. **Clarity**: Clear visual hierarchy and status indicators
3. **Efficiency**: Minimal clicks to complete common tasks
4. **Feedback**: Immediate confirmation of all user actions
5. **Accessibility**: Mobile-responsive design for tablet use