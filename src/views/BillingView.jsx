import { Check, CreditCard, Shield, Download } from 'lucide-react'

export default function BillingView() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-white">Bills & Payments</h1>
        <p className="text-xs text-prodly-muted mt-0.5">Manage your team subscription, invoices, and billing method</p>
      </div>

      {/* Plan card */}
      <div className="prodly-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-prodly-lime/30">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-prodly-lime text-black uppercase tracking-wider">
            Active Plan
          </span>
          <h2 className="text-2xl font-bold text-white mt-2.5">Prodaily Pro Workspace</h2>
          <p className="text-xs text-prodly-muted mt-1">Unlimited deep work analytics, AI Insights & team scheduling</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-prodly-muted">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-prodly-lime" /> 5 Team Seats</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-prodly-lime" /> Real-time distraction blocker</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-prodly-lime" /> Unlimited AI insights</span>
          </div>
        </div>

        <div className="text-left md:text-right flex-shrink-0">
          <p className="text-3xl font-black text-white">$29<span className="text-xs font-normal text-prodly-muted">/month</span></p>
          <p className="text-[10px] text-prodly-muted mt-1">Renews on Nov 15, 2026</p>
          <button className="btn-lime mt-3">Manage Plan</button>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="prodly-card p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">Billing History</h3>
        <div className="space-y-2 text-xs">
          {[
            { id: 'INV-2026-009', date: 'Oct 15, 2026', amount: '$29.00', status: 'Paid' },
            { id: 'INV-2026-008', date: 'Sep 15, 2026', amount: '$29.00', status: 'Paid' },
            { id: 'INV-2026-007', date: 'Aug 15, 2026', amount: '$29.00', status: 'Paid' },
          ].map(inv => (
            <div key={inv.id} className="p-3 rounded-xl bg-prodly-bg border border-prodly-border flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{inv.id}</p>
                <p className="text-[10px] text-prodly-muted">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-white">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-prodly-lime/10 text-prodly-lime border border-prodly-lime/30">
                  {inv.status}
                </span>
                <button className="text-prodly-muted hover:text-white" title="Download receipt">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
