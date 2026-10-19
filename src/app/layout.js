
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './globals.css'

import AdminShell from '@/components/AdminShell'

export const metadata = {
    title: 'translate-admin-dashboard',
    description: 'translate-admin-dashboard',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AdminShell>
                    {children}
                </AdminShell>
            </body>
        </html>
    )
}