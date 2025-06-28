# Убедись, что ты запускаешь это в корне проекта Next.js (с app/ и src/)

# Основные директории
$pages = @(
    "app/dashboard",
    "app/dashboard/orders",
    "app/dashboard/orders/new",
    "app/dashboard/orders/templates",
    "app/dashboard/suppliers",
    "app/dashboard/inventory",
    "app/dashboard/inventory/stock",
    "app/dashboard/inventory/audits",
    "app/dashboard/products",
    "app/dashboard/products/categories",
    "app/dashboard/menu",
    "app/dashboard/analytics",
    "app/dashboard/finance",
    "app/dashboard/shifts",
    "app/dashboard/staff",
    "app/dashboard/staff/roles",
    "app/dashboard/feedback",
    "app/dashboard/training",
    "app/dashboard/quality",
    "app/dashboard/logistics",
    "app/dashboard/settings",
    "app/dashboard/settings/restaurants",
    "app/dashboard/settings/users",
    "app/dashboard/settings/billing"
)

# Создаем страницы
foreach ($page in $pages) {
    $fullPath = "$page"
    New-Item -ItemType Directory -Force -Path $fullPath | Out-Null

    $filePath = Join-Path $fullPath "page.tsx"

    @"
export default function Page() {
    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold'>$($page.Replace("app/dashboard/", "").Replace("app/", "").Replace("/", " > "))</h1>
        </div>
    );
}
"@ | Out-File -Encoding utf8 $filePath
}

# Создаём layout для dashboard
$layoutPath = "app/dashboard/layout.tsx"
@"
import CustomSidebar from "@/components/custom-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <CustomSidebar />
            <div className="flex flex-col flex-1">
                {/* Здесь может быть Topbar */}
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
"@ | Out-File -Encoding utf8 $layoutPath

Write-Host "✅ Dashboard структура успешно создана!"
