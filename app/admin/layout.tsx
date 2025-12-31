import { AuthProvider } from '@/components/admin/AuthProvider';
import '../globals.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
