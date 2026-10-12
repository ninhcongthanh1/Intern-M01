import React, { useState } from 'react';
import { 
  GraduationCap, Bell, QrCode, Mail, UserCheck, 
  ChevronDown, Check, UserPlus, RefreshCw, LogOut, CheckCircle2, BookOpen 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenQr: () => void;
  onOpenPublicApply: () => void;
  onOpenEmailLog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQr,
  onOpenPublicApply,
  onOpenEmailLog
}) => {
  const { 
    currentUser, switchRole, notifications, 
    markNotificationAsRead, markAllNotificationsAsRead, resetToDefaultData 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: { role: UserRole; title: string; desc: string; badgeColor: string }[] = [
    { role: 'hr', title: 'HR Manager (Trần Thu Hà)', desc: 'Tuyển dụng, hợp đồng, chấm công, phụ cấp', badgeColor: 'bg-emerald-500' },
    { role: 'mentor', title: 'Senior Mentor (Lê Hoàng Nam)', desc: 'Giao việc, chấm báo cáo tuần, đánh giá', badgeColor: 'bg-blue-500' },
    { role: 'intern', title: 'Thực tập sinh (Phạm Minh Tuấn)', desc: 'Chấm công, nộp báo cáo, xem phụ cấp', badgeColor: 'bg-amber-500' },
    { role: 'admin', title: 'Quản trị hệ thống (Nguyễn Văn Quản Trị)', desc: 'Phân quyền, audit logs, sao lưu database', badgeColor: 'bg-purple-500' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">IMS Corp</span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                v2.6 Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Hệ Thống Quản Lý Thực Tập Sinh Toàn Diện</p>
          </div>
        </div>

        {/* Center / Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Mở máy quét điểm danh QR"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Chấm công QR</span>
          </button>

          <button
            onClick={onOpenPublicApply}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            title="Mở cổng ứng tuyển sinh viên"
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Cổng nộp hồ sơ</span>
          </button>

          <button
            onClick={onOpenEmailLog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Xem hộp thư email tự động hệ thống"
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Hòm thư hệ thống</span>
          </button>

          <a
            href="/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            title="Mở tài liệu Swagger OpenAPI"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Swagger API</span>
          </a>
        </div>

        {/* Right: Role Switcher & Notification & Profile */}
        <div className="flex items-center gap-3">
          {/* Role switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-all shadow-2xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-semibold text-slate-900 uppercase">
                {currentUser.role}
              </span>
              <span className="text-slate-400">|</span>
              <span className="max-w-[110px] truncate font-medium text-slate-700">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">CHUYỂN ĐỔI NHANH VAI TRÒ</div>
                  <div className="text-[11px] text-slate-500">Trải nghiệm các góc nhìn nghiệp vụ khác nhau</div>
                </div>
                <div className="py-1 space-y-1">
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors ${
                        currentUser.role === r.role ? 'bg-blue-50/80 border border-blue-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${r.badgeColor}`} />
                      <div className="grow">
                        <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                          <span>{r.title}</span>
                          {currentUser.role === r.role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-100 px-1">
                  <button
                    onClick={() => {
                      resetToDefaultData();
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đặt lại dữ liệu mẫu ban đầu</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowRoleMenu(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900">THÔNG BÁO</span>
                    <span className="text-[11px] text-slate-500 ml-1.5">({unreadCount} chưa đọc)</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-blue-600 hover:underline font-medium"
                    >
                      Đọc tất cả
                    </button>
                  )}
                </div>
                <div className="py-1 max-h-80 overflow-y-auto space-y-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">Không có thông báo nào</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                          !n.read ? 'bg-blue-50/60 font-semibold' : 'hover:bg-slate-50 opacity-80'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-900">
                          <span className="font-bold truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal shrink-0 ml-2">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 font-normal leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
