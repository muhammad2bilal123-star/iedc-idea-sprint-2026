import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  Database,
  Trash2,
  FileSpreadsheet,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'iedc_idea_sprint_2026_registrations_v4';

const DEFAULT_MEMBERS = [
  { name: '', phone: '', department: 'CSE', batch: 'S3 (2025–2029)' },
  { name: '', phone: '', department: 'ECE', batch: 'S3 (2025–2029)' },
  { name: '', phone: '', department: 'CSE', batch: 'S3 (2025–2029)' },
];

export default function Registration({ prefilledIdea }) {
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: 4,
    leadName: '',
    email: '',
    phone: '',
    department: 'CSE',
    batch: 'S3 (2025–2029)',
    members: DEFAULT_MEMBERS,
    ideaSummary: '',
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedTeams, setSavedTeams] = useState([]);
  const [showAdminDesk, setShowAdminDesk] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedTeams(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Could not read localStorage', err);
    }
  }, []);

  useEffect(() => {
    if (prefilledIdea) {
      setFormData((prev) => ({ ...prev, ideaSummary: prefilledIdea }));
    }
  }, [prefilledIdea]);

  const activeMemberCount = formData.teamSize - 1;
  const activeMembers = formData.members.slice(0, activeMemberCount);

  const handleSizeSelect = (size) => {
    setFormData((prev) => ({
      ...prev,
      teamSize: size,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.teamName.trim() || formData.teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters.';
    }
    if (!formData.leadName.trim()) {
      newErrors.leadName = 'Team Leader full name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address for the Team Leader.';
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit mobile number for the Team Leader.';
    }

    activeMembers.forEach((member, idx) => {
      if (!member.name.trim()) {
        newErrors[`member_name_${idx}`] = `Member #${idx + 2} full name is required.`;
      }
      if (!/^[6-9]\d{9}$/.test((member.phone || '').trim())) {
        newErrors[`member_phone_${idx}`] = `Enter a valid 10-digit number for Member #${idx + 2}.`;
      }
    });

    if (!formData.ideaSummary.trim() || formData.ideaSummary.trim().length < 20) {
      newErrors.ideaSummary =
        'Please describe your idea in at least 20 characters (or use the Idea Generator above).';
    }
    if (!formData.agreed) {
      newErrors.agreed = 'You must agree to the 24-hour sprint code of conduct.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoFillDemo = () => {
    setFormData({
      teamName: 'Sprint Squad Alpha',
      teamSize: 4,
      leadName: 'Team Leader Name',
      email: 'leader@ceconline.edu',
      phone: '9876543210',
      department: 'CSE',
      batch: 'S3 (2025–2029)',
      members: [
        { name: 'Member Two', phone: '9847011223', department: 'CSE', batch: 'S3 (2025–2029)' },
        { name: 'Member Three', phone: '9447122334', department: 'ECE', batch: 'S3 (2025–2029)' },
        { name: 'Member Four', phone: '9995233445', department: 'EEE', batch: 'S3 (2025–2029)' },
      ],
      ideaSummary:
        prefilledIdea ||
        'Build a Campus Mobility & Transit solution powered by Edge Computer Vision for 1,500+ engineering students at CEC.',
      agreed: true,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const randomId = `CEC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const newTicket = {
        ...formData,
        members: activeMembers,
        ticketId: randomId,
        registeredAt: timestamp,
      };

      const updatedTeams = [newTicket, ...savedTeams];
      setSavedTeams(updatedTeams);
      setSubmittedTicket(newTicket);
      setShowSuccessModal(true);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeams));
      } catch (err) {
        console.error('Could not save to localStorage', err);
      }
    }
  };

  const handleDownloadPass = (ticket) => {
    const memberSummaryText = (ticket.members || [])
      .map((m, i) => `M${i + 2}: ${m.name} (+91 ${m.phone || 'N/A'}, ${m.department} ${m.batch})`)
      .join(' | ');

    const qrPayload = encodeURIComponent(
      `IEDC IDEA SPRINT 2026 PASS\nID: ${ticket.ticketId}\nTeam: ${ticket.teamName} (${ticket.teamSize} Members)\nLEADER: ${ticket.leadName} (+91 ${ticket.phone}, ${ticket.department} - ${ticket.batch})\nMEMBERS: ${memberSummaryText}`
    );
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrPayload}`;

    const memberRowsHtml = (ticket.members || [])
      .map(
        (m, idx) => `
        <div class="roster-row member-row">
          <div>
            <span class="tag-member">MEMBER #${idx + 2}</span>
            <strong>${m.name}</strong>
            <span class="phone-pill">• +91 ${m.phone || 'N/A'}</span>
          </div>
          <div class="batch-pill">${m.department} • ${m.batch}</div>
        </div>`
      )
      .join('');

    const passWindow = window.open('', '_blank', 'width=840,height=700');
    if (!passWindow) return;

    passWindow.document.write(`
      <html>
        <head>
          <title>Builder Pass - ${ticket.ticketId}</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #020617; color: #f8fafc; padding: 28px; }
            .card { border: 2px solid #f97316; border-radius: 20px; padding: 28px; background: #0f172a; }
            .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 20px; }
            .badge { color: #fb923c; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
            h1 { margin: 6px 0 4px; font-size: 28px; }
            .meta { color: #94a3b8; font-size: 13px; font-family: monospace; }
            .qr-box { background: #ffffff; padding: 12px; border-radius: 14px; text-align: center; color: #020617; font-weight: 800; font-size: 10px; shrink: 0; }
            .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; font-weight: 800; margin-bottom: 10px; }
            .roster { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
            .roster-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: 10px; font-size: 13px; }
            .leader-row { background: rgba(249, 115, 22, 0.12); border: 1px solid rgba(249, 115, 22, 0.45); }
            .member-row { background: #020617; border: 1px solid #1e293b; }
            .tag-leader { background: #f97316; color: #020617; font-weight: 800; font-size: 10px; padding: 3px 8px; border-radius: 6px; margin-right: 10px; }
            .tag-member { background: #1e293b; color: #38bdf8; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 6px; margin-right: 10px; }
            .phone-pill { font-family: monospace; font-size: 12px; color: #94a3b8; margin-left: 6px; }
            .batch-pill { font-family: monospace; font-size: 12px; color: #cbd5e1; }
            .idea-box { background: #020617; padding: 12px 14px; border-radius: 10px; border: 1px solid #1e293b; font-size: 13px; }
            @media print { body { background: #fff; color: #000; } .card { border-color: #000; } }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="top">
              <div>
                <div class="badge">IEDC BOOTCAMP CEC // OFFICIAL TEAM PASS</div>
                <h1>Team: ${ticket.teamName}</h1>
                <div class="meta">PASS ID: ${ticket.ticketId} • SIZE: ${ticket.teamSize} PARTICIPANTS • NOV 14-15, 2026</div>
                <div class="meta" style="margin-top:4px;">LEADER EMAIL: ${ticket.email} | LEADER PHONE: +91 ${ticket.phone}</div>
              </div>
              <div class="qr-box">
                <img src="${qrUrl}" width="140" height="140" alt="QR Code" />
                <div style="margin-top:6px;">SCAN AT CHECK-IN</div>
              </div>
            </div>

            <div class="section-title">Verified Team Roster (1 Leader + ${(ticket.members || []).length} Members)</div>
            <div class="roster">
              <div class="roster-row leader-row">
                <div>
                  <span class="tag-leader">#1 TEAM LEADER</span>
                  <strong>${ticket.leadName}</strong>
                  <span class="phone-pill">• +91 ${ticket.phone}</span>
                </div>
                <div class="batch-pill">${ticket.department} • ${ticket.batch}</div>
              </div>
              ${memberRowsHtml}
            </div>

            <div class="idea-box">
              <strong>Sprint Problem Statement:</strong> ${ticket.ideaSummary}
            </div>
          </div>
          <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
        </body>
      </html>
    `);
    passWindow.document.close();
  };

  const handleExportCSV = () => {
    if (savedTeams.length === 0) return;
    const headers = [
      'Pass ID',
      'Team Name',
      'Team Size',
      'Leader Name (#1)',
      'Leader Phone',
      'Leader Email',
      'Leader Branch & Batch',
      'Other Members (#2-#4 Name, Phone, Batch)',
      'Registered At',
    ];
    const rows = savedTeams.map((t) => {
      const membersFormatted = (t.members || [])
        .map((m, i) => `M${i + 2}: ${m.name} (+91 ${m.phone || 'N/A'} | ${m.department} ${m.batch})`)
        .join(' ; ');
      return [
        t.ticketId,
        `"${t.teamName}"`,
        t.teamSize,
        `"${t.leadName}"`,
        t.phone,
        t.email,
        `"${t.department} ${t.batch}"`,
        `"${membersFormatted}"`,
        `"${t.registeredAt}"`,
      ];
    });
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'IEDC_Idea_Sprint_2026_Teams.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedTeams([]);
  };

  const getQrImageUrl = (ticket) => {
    const membersList = (ticket.members || [])
      .map((m, i) => `M${i + 2}:${m.name}(${m.phone || 'N/A'},${m.department}-${m.batch})`)
      .join(', ');
    const text = `IEDC SPRINT 2026 | ID: ${ticket.ticketId} | TEAM: ${ticket.teamName} (${ticket.teamSize}) | LEADER: ${ticket.leadName} (${ticket.phone}, ${ticket.department}-${ticket.batch}) | MEMBERS: ${membersList}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="register"
      aria-labelledby="register-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80"
    >
      {/* CUSTOM POPUP MODAL ON REGISTRATION COMPLETION */}
      {showSuccessModal && submittedTicket && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md rounded-3xl border-2 border-emerald-500/50 bg-slate-900 p-6 sm:p-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close popup"
              className="absolute top-4 right-4 rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 border border-emerald-500/30">
              Registration Completed
            </span>

            <h3 id="modal-title" className="mt-3 text-2xl font-black text-white">
              Thank You, Team {submittedTicket.teamName}!
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your {submittedTicket.teamSize}-member team is officially registered for{' '}
              <strong className="text-white">IEDC Idea Sprint 2026</strong>. Your scannable QR
              Builder Pass is ready below.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Official Pass ID:</span>
                <span className="font-mono font-bold text-orange-400">
                  {submittedTicket.ticketId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Team Leader (#1):</span>
                <span className="font-semibold text-white">{submittedTicket.leadName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Participants:</span>
                <span className="font-semibold text-cyan-300">
                  {submittedTicket.teamSize} Members Verified
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  handleDownloadPass(submittedTicket);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:bg-orange-400 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Pass
              </button>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs font-bold text-white hover:border-emerald-400 cursor-pointer"
              >
                View QR Pass
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            Team Onboarding &amp; Roster Portal
          </span>
          <h2 id="register-heading" className="mt-1 text-3xl sm:text-4xl font-black text-white">
            Register for IEDC Idea Sprint 2026
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Select your participant count to enter your Team Leader and Teammates with contact
            numbers, then generate your full team QR Builder Pass.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdminDesk(!showAdminDesk)}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-cyan-300 hover:border-cyan-400 cursor-pointer"
        >
          <Database className="w-4 h-4" />
          Check-In Database ({savedTeams.length})
        </button>
      </div>

      {showAdminDesk && (
        <div className="mb-8 rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Organizer Check-In Roster (Leader &amp; Teammates)
              </h3>
              <p className="text-xs text-slate-400">
                Displays the Team Leader (#1) and all Teammates (#2–#4) with their verified mobile
                numbers and batches.
              </p>
            </div>
            {savedTeams.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={handleClearStorage}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/25 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {savedTeams.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">
              No teams registered yet. Submit the form below to inspect leader and teammate records!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-slate-400 uppercase">
                  <tr>
                    <th className="py-2 pr-3">Pass ID</th>
                    <th className="py-2 pr-3">Team Name</th>
                    <th className="py-2 pr-3">Team Leader (#1)</th>
                    <th className="py-2 pr-3">Teammates (#2–#4)</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {savedTeams.map((team) => (
                    <tr key={team.ticketId}>
                      <td className="py-2.5 pr-3 font-mono text-orange-400 font-bold">
                        {team.ticketId}
                      </td>
                      <td className="py-2.5 pr-3 font-semibold text-white">
                        {team.teamName} ({team.teamSize})
                      </td>
                      <td className="py-2.5 pr-3">
                        <span className="inline-block rounded bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-bold text-orange-300 mr-1">
                          LEADER
                        </span>
                        <strong className="text-white">{team.leadName}</strong>
                        <div className="text-[11px] font-mono text-slate-400">
                          +91 {team.phone} • {team.department} {team.batch}
                        </div>
                      </td>
                      <td className="py-2.5 pr-3 text-slate-300 space-y-1">
                        {(team.members || []).map((m, idx) => (
                          <div key={idx} className="text-[11px]">
                            <span className="text-cyan-400 font-mono font-bold">M{idx + 2}:</span>{' '}
                            <strong className="text-white">{m.name}</strong> •{' '}
                            <span className="font-mono text-emerald-300">+91 {m.phone}</span> (
                            {m.department} • {m.batch})
                          </div>
                        ))}
                      </td>
                      <td className="py-2.5">
                        <button
                          type="button"
                          onClick={() => setSubmittedTicket(team)}
                          className="rounded-lg bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 text-xs font-bold text-orange-300 hover:bg-orange-500/25 cursor-pointer"
                        >
                          View Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {submittedTicket ? (
        <div className="rounded-3xl border-2 border-emerald-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Verified Digital Builder Pass ({submittedTicket.teamSize} Participants)
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Team: {submittedTicket.teamName}
              </h3>
              <p className="text-xs font-mono text-orange-400">
                PASS ID: {submittedTicket.ticketId} • SAVED TO CHECK-IN ROSTER
              </p>
              <p className="text-xs text-slate-400 pt-1">
                Includes Team Leader (#1) and all registered Teammates with verified contact numbers
                below.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow-lg shrink-0 self-start">
              <img
                src={getQrImageUrl(submittedTicket)}
                alt={`Scannable QR Pass for ${submittedTicket.teamName}`}
                width="136"
                height="136"
                className="rounded-lg"
              />
              <span className="mt-1.5 text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                SCAN TEAM PASS
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              Official Team Roster (Leader + Teammates)
            </span>

            <div className="rounded-2xl border-2 border-orange-500/50 bg-orange-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-orange-500 px-2.5 py-1 text-xs font-black uppercase text-slate-950">
                  #1 TEAM LEADER
                </span>
                <div>
                  <strong className="text-base font-extrabold text-white block">
                    {submittedTicket.leadName}
                  </strong>
                  <span className="text-xs text-orange-200 font-mono">
                    +91 {submittedTicket.phone} • {submittedTicket.email}
                  </span>
                </div>
              </div>
              <span className="rounded-lg bg-slate-950/90 border border-orange-500/30 px-3 py-1.5 text-xs font-mono font-bold text-orange-300 self-start sm:self-center">
                {submittedTicket.department} • {submittedTicket.batch}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {(submittedTicket.members || []).map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs font-bold text-cyan-300">
                      MEMBER #{idx + 2}
                    </span>
                    <div>
                      <strong className="text-sm font-bold text-white block sm:inline">
                        {member.name}
                      </strong>
                      <span className="text-xs font-mono text-emerald-400 sm:ml-3 block sm:inline">
                        • +91 {member.phone}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-mono text-slate-300 self-start sm:self-center">
                    {member.department} • {member.batch}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
            <span className="text-xs font-mono uppercase text-orange-400 block mb-1">
              Registered Problem Statement
            </span>
            <p className="text-sm text-slate-200">{submittedTicket.ideaSummary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleDownloadPass(submittedTicket)}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-orange-400 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download / Print Full Team Pass (PDF)
            </button>
            <button
              type="button"
              onClick={() => setSubmittedTicket(null)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-xs sm:text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Register Another Team
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <span className="text-xs font-mono uppercase text-slate-400">
              Step 1: Select Team Size &amp; Enter Leader + Teammate Details
            </span>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/40 bg-orange-500/10 px-3.5 py-2 text-xs font-bold text-orange-300 hover:bg-orange-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto-Fill Demo Team
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div className="sm:col-span-7">
              <label
                htmlFor="teamName"
                className="block text-xs font-bold uppercase text-slate-300 mb-2"
              >
                Team Name *
              </label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your team name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
              />
              {errors.teamName && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.teamName}
                </p>
              )}
            </div>

            <div className="sm:col-span-5">
              <span className="block text-xs font-bold uppercase text-slate-300 mb-2">
                Select Number of Participants *
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSizeSelect(num)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 text-xs font-extrabold transition-all cursor-pointer ${
                      formData.teamSize === num
                        ? 'border-orange-500 bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    {num} Members
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-orange-500/40 bg-slate-950/90 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="rounded-lg bg-orange-500 px-2.5 py-1 text-xs font-black uppercase text-slate-950">
                  PARTICIPANT #1 • TEAM LEADER
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Primary Contact &amp; Team Lead
                </span>
              </div>
              <span className="text-[11px] font-mono text-orange-400">LEADER DETAILS FIRST</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6">
                <label
                  htmlFor="leadName"
                  className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                >
                  Leader Full Name *
                </label>
                <input
                  id="leadName"
                  name="leadName"
                  type="text"
                  value={formData.leadName}
                  onChange={handleChange}
                  placeholder="Enter Team Leader's full name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                />
                {errors.leadName && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.leadName}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                >
                  Leader Branch
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white"
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="batch"
                  className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                >
                  Leader Batch / Sem
                </label>
                <select
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white"
                >
                  <option value="S1 (2026–2030)">S1 (2026–2030)</option>
                  <option value="S3 (2025–2029)">S3 (2025–2029)</option>
                  <option value="S5 (2024–2028)">S5 (2024–2028)</option>
                  <option value="S7 (2023–2027)">S7 (2023–2027)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                >
                  Leader Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="leader@ceconline.edu"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                >
                  Leader WhatsApp / Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-1 text-xs font-extrabold uppercase text-cyan-300">
                  TEAMMATES (#2 {formData.teamSize > 2 ? `TO #${formData.teamSize}` : ''})
                </span>
                <span className="text-xs text-slate-400">
                  Enter full name, mobile number, branch, and batch for your remaining{' '}
                  {activeMemberCount} teammate{activeMemberCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {activeMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-mono font-bold text-cyan-300">
                      PARTICIPANT #{index + 2} • TEAMMATE
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Teammate {index + 1} of {activeMemberCount}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor={`member-name-${index}`}
                        className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Member #{index + 2} Full Name *
                      </label>
                      <input
                        id={`member-name-${index}`}
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        placeholder={`Enter Member #${index + 2} name`}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                      {errors[`member_name_${index}`] && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors[`member_name_${index}`]}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor={`member-phone-${index}`}
                        className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Member #{index + 2} Phone *
                      </label>
                      <input
                        id={`member-phone-${index}`}
                        type="tel"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                      {errors[`member_phone_${index}`] && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors[`member_phone_${index}`]}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`member-dept-${index}`}
                        className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Branch
                      </label>
                      <select
                        id={`member-dept-${index}`}
                        value={member.department}
                        onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2.5 text-sm text-white"
                      >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MCA">MCA</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor={`member-batch-${index}`}
                        className="block text-xs font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Batch / Semester
                      </label>
                      <select
                        id={`member-batch-${index}`}
                        value={member.batch}
                        onChange={(e) => handleMemberChange(index, 'batch', e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2.5 text-sm text-white"
                      >
                        <option value="S1 (2026–2030)">S1 (2026–2030)</option>
                        <option value="S3 (2025–2029)">S3 (2025–2029)</option>
                        <option value="S5 (2024–2028)">S5 (2024–2028)</option>
                        <option value="S7 (2023–2027)">S7 (2023–2027)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="ideaSummary"
              className="block text-xs font-bold uppercase text-slate-300 mb-2"
            >
              Proposed Idea / Problem Statement *
            </label>
            <textarea
              id="ideaSummary"
              name="ideaSummary"
              rows={3}
              value={formData.ideaSummary}
              onChange={handleChange}
              placeholder="Describe the campus or industry problem your team wants to solve..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
            />
            {errors.ideaSummary && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.ideaSummary}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-orange-500"
              />
              <span className="text-xs sm:text-sm text-slate-300">
                We confirm that our Team Leader and all Teammates listed above will build our
                prototype fresh during the 24-hour IEDC Idea Sprint 2026 at CEC.
              </span>
            </label>
            {errors.agreed && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.agreed}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
            Validate Team &amp; Generate Full Roster Pass
          </button>
        </form>
      )}
    </section>
  );
}