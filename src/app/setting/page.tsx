'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Edit, Trash2, Plus, Monitor, Home, Save, ArrowLeft, ArrowRight } from 'lucide-react';

interface SettingData {
  id: string;
  n_hospital: string;
  n_department: string;
  head_left: string;
  head_right: string;
  amount_left: number;
  amount_right: number;
  query_left: string;
  query_right: string;
}

interface PayloadData {
  type: string;
  typeMonitor: string;
  n_hospital: string;
  n_department: string;
  head_left: string;
  head_right: string;
  urgent_setup: string;
  time_wait: number;
  amount_left: number;
  amount_right: number;
  arr_l: boolean;
  arr_r: boolean;
  set_descrip: boolean;
  set_notice: boolean;
  stem_surname: string;
  stem_surname_popup: string;
  stem_surname_table: string;
  urgent_color: boolean;
  status_patient: boolean;
  status_check: boolean;
  lock_position: boolean;
  lock_position_right: boolean;
  urgent_level: boolean;
  a_sound: boolean;
  b_sound: boolean;
  c_sound: boolean;
  time_col: boolean;
  station_left: string;
  station_right: string;
  query_left: string;
  query_right: string;
  listPage: string;
}

export default function SettingPage() {
  const [settings, setSettings] = useState<SettingData[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ action: '', id: '' });

  // Fetch settings from database
  const fetchSettings = async () => {
    try {
      setIsLoadingData(true);
      const response = await fetch('/api/setting/count');
      const data = await response.json();
      
      if (data.success && data.data) {
        const formattedSettings: SettingData[] = data.data.map((item: any) => ({
          id: item.id?.toString() || '',
          n_hospital: item.n_hospital || '',
          n_department: item.n_department || '',
          head_left: item.head_left || '',
          head_right: item.head_right || '',
          amount_left: item.amount_left || 0,
          amount_right: item.amount_right || 0,
          query_left: item.query_left || '',
          query_right: item.query_right || '',
        }));
        setSettings(formattedSettings);
        if (formattedSettings.length > 0 && !selectedId) {
          setSelectedId(formattedSettings[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Payload state
  const [payload, setPayload] = useState<PayloadData>({
    type: 'ประเภทหน้าจอ',
    typeMonitor: '',
    n_hospital: 'โรงพยาบาล',
    n_department: 'ตรวจโรคทั่วไป',
    head_left: 'จุดซักประวัติ',
    head_right: 'ห้องตรวจ',
    urgent_setup: 'ฉุกเฉิน',
    time_wait: 300,
    amount_left: 2,
    amount_right: 2,
    arr_l: false,
    arr_r: false,
    set_descrip: false,
    set_notice: false,
    stem_surname: 'name',
    stem_surname_popup: 'false',
    stem_surname_table: 'name',
    urgent_color: true,
    status_patient: true,
    status_check: false,
    lock_position: false,
    lock_position_right: false,
    urgent_level: true,
    a_sound: true,
    b_sound: false,
    c_sound: false,
    time_col: true,
    station_left: '',
    station_right: '',
    query_left: '2',
    query_right: '2',
    listPage: '',
  });

  // Auto-generate ID
  const generateNextId = async () => {
    try {
      const response = await fetch('/api/setting/count');
      const data = await response.json();
      // ใช้ maxId แทน count เพื่อป้องกันการ generate ID ซ้ำ
      const nextId = (data.maxId || 0) + 1;
      setPayload(prev => ({ ...prev, typeMonitor: nextId.toString() }));
    } catch (error) {
      console.error('Error generating ID:', error);
      // Fallback: use timestamp
      setPayload(prev => ({ ...prev, typeMonitor: Date.now().toString() }));
    }
  };

  // Reset form
  const resetForm = () => {
    setPayload({
      type: 'ประเภทหน้าจอ',
      typeMonitor: '',
      n_hospital: 'โรงพยาบาล',
      n_department: 'ตรวจโรคทั่วไป',
      head_left: 'จุดซักประวัติ',
      head_right: 'ห้องตรวจ',
      urgent_setup: 'ฉุกเฉิน',
      time_wait: 300,
      amount_left: 2,
      amount_right: 2,
      arr_l: false,
      arr_r: false,
      set_descrip: false,
      set_notice: false,
      stem_surname: 'name',
      stem_surname_popup: 'false',
      stem_surname_table: 'name',
      urgent_color: true,
      status_patient: true,
      status_check: false,
      lock_position: false,
      lock_position_right: false,
      urgent_level: true,
      a_sound: true,
      b_sound: false,
      c_sound: false,
      time_col: true,
      station_left: '',
      station_right: '',
      query_left: '2',
      query_right: '2',
      listPage: '',
    });
    setCurrentStep(1);
  };

  // Handle modal open
  const handleOpenModal = async () => {
    resetForm();
    await generateNextId();
    setShowModal(true);
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/setting/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh data
        await fetchSettings();
        setShowModal(false);
        
        // แสดง success popup
        setSuccessMessage({
          action: result.action === 'update' ? 'อัปเดต' : 'เพิ่ม',
          id: result.id
        });
        setShowSuccessPopup(true);
        
        // ซ่อน popup อัตโนมัติหลัง 3 วินาที
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        alert('เกิดข้อผิดพลาด: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm(`คุณต้องการลบหน้าจอ ID: ${id} ใช่หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/setting/delete?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh data
        await fetchSettings();
        
        // แสดง success popup
        setSuccessMessage({
          action: 'ลบ',
          id: result.id
        });
        setShowSuccessPopup(true);
        
        // ซ่อน popup อัตโนมัติหลัง 3 วินาที
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        alert('เกิดข้อผิดพลาด: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  // Next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg shadow-blue-200/50">
                <Settings className="w-8 h-8 text-white" />
        </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">การตั้งค่าระบบ</h1>
                <p className="text-sm text-slate-500 mt-1">จัดการการตั้งค่าหน้าจอแสดงผล</p>
        </div>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 shadow-sm hover:shadow-md"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

        {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60 hover:shadow-md hover:border-blue-300/60 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                <p className="text-sm text-slate-500 font-medium">จำนวนหน้าจอ</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{settings.length}</p>
                </div>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Monitor className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60 hover:shadow-md hover:border-blue-300/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">แผนกที่ใช้งาน</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {new Set(settings.map((s) => s.n_department)).size}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Settings className="w-8 h-8 text-blue-500" />
              </div>
            </div>
              </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60 hover:shadow-md hover:border-blue-300/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">หน้าจอที่เลือก</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{selectedId || '-'}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Monitor className="w-8 h-8 text-blue-500" />
              </div>
            </div>
              </div>
            </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-slate-200/60">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 flex items-center justify-between border-b border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800">รายการหน้าจอแสดงผล</h2>
            <button 
              onClick={handleOpenModal}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md shadow-blue-200/50 hover:shadow-lg hover:shadow-blue-300/50"
            >
              <Plus className="w-5 h-5" />
              <span>เพิ่มหน้าจอ</span>
            </button>
              </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ID หน้าจอ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    โรงพยาบาล
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    แผนก
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    หัวตาราง (ซ้าย)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    หัวตาราง (ขวา)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    จำนวนห้อง
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Department ID
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    จัดการ
                  </th>
                </tr>
              </thead>
               <tbody className="divide-y divide-slate-100">
                 {isLoadingData ? (
                   <tr>
                     <td colSpan={8} className="px-6 py-16 text-center">
                       <div className="flex flex-col items-center gap-4">
                         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-slate-600 font-medium">กำลังโหลดข้อมูล...</p>
                       </div>
                     </td>
                   </tr>
                 ) : settings.length === 0 ? (
                   <tr>
                     <td colSpan={8} className="px-6 py-16 text-center">
                       <div className="flex flex-col items-center gap-4">
                         <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                           <Monitor className="w-10 h-10 text-blue-400" />
                         </div>
                         <div>
                           <p className="text-lg font-semibold text-slate-700 mb-2">ยังไม่มีข้อมูลหน้าจอ</p>
                           <p className="text-sm text-slate-500 mb-4">เริ่มต้นสร้างหน้าจอแสดงผลแรกของคุณ</p>
                           <button
                             onClick={handleOpenModal}
                             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md shadow-blue-200/50"
                           >
                             + เพิ่มหน้าจอแรก
                           </button>
                         </div>
                       </div>
                     </td>
                   </tr>
                 ) : settings.map((setting) => (
                  <tr
                    key={setting.id}
                    className={`hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer ${
                      selectedId === setting.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedId(setting.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                          <Monitor className="w-5 h-5 text-white" />
                        </div>
                        <span className="ml-3 text-sm font-bold text-slate-800">{setting.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">{setting.n_hospital}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        {setting.n_department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{setting.head_left}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{setting.head_right}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200">
                          L: {setting.amount_left}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium border border-blue-200">
                          R: {setting.amount_right}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200">
                          L: {setting.query_left}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium border border-blue-200">
                          R: {setting.query_right}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          href={`/setting/${setting.id}`}
                          className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200"
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(setting.id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

          {/* Table Footer */}
          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                แสดง <span className="font-semibold text-slate-800">{settings.length}</span> รายการ
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                  ก่อนหน้า
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-sm transition-all duration-200">
                  ถัดไป
                </button>
              </div>
            </div>
              </div>
            </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 flex items-center justify-between border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">เพิ่มหน้าจอใหม่</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Progress Bar */}
            <div className="bg-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 font-medium">ขั้นตอนที่ {currentStep} จาก 3</span>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep ? 'bg-blue-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">ข้อมูลพื้นฐาน</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ID หน้าจอ</label>
                      <input
                        type="text"
                        value={payload.typeMonitor}
                        onChange={(e) => setPayload(prev => ({ ...prev, typeMonitor: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="เช่น 201"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อโรงพยาบาล</label>
                      <input
                        type="text"
                        value={payload.n_hospital}
                        onChange={(e) => setPayload(prev => ({ ...prev, n_hospital: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">แผนก</label>
                      <input
                        type="text"
                        value={payload.n_department}
                        onChange={(e) => setPayload(prev => ({ ...prev, n_department: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">หัวตาราง (ซ้าย)</label>
                      <input
                        type="text"
                        value={payload.head_left}
                        onChange={(e) => setPayload(prev => ({ ...prev, head_left: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">หัวตาราง (ขวา)</label>
                      <input
                        type="text"
                        value={payload.head_right}
                        onChange={(e) => setPayload(prev => ({ ...prev, head_right: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">เวลารอ (วินาที)</label>
                      <input
                        type="number"
                        value={payload.time_wait}
                        onChange={(e) => setPayload(prev => ({ ...prev, time_wait: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Table Settings */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">การตั้งค่าตาราง</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">จำนวนห้อง (ซ้าย)</label>
                      <input
                        type="number"
                        value={payload.amount_left}
                        onChange={(e) => setPayload(prev => ({ ...prev, amount_left: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">จำนวนห้อง (ขวา)</label>
                      <input
                        type="number"
                        value={payload.amount_right}
                        onChange={(e) => setPayload(prev => ({ ...prev, amount_right: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">ชื่อโต๊ะ (ซ้าย)</label>
                      <textarea
                        value={payload.station_left}
                        onChange={(e) => setPayload(prev => ({ ...prev, station_left: e.target.value }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="เช่น โต๊ะซักประวัติ 1,โต๊ะซักประวัติ 2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">ชื่อโต๊ะ (ขวา)</label>
                      <textarea
                        value={payload.station_right}
                        onChange={(e) => setPayload(prev => ({ ...prev, station_right: e.target.value }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="เช่น โต๊ะตรวจ 1,โต๊ะตรวจ 2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">Department ID (ซ้าย)</label>
                      <input
                        type="text"
                        value={payload.query_left}
                        onChange={(e) => setPayload(prev => ({ ...prev, query_left: e.target.value }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">Department ID (ขวา)</label>
                      <input
                        type="text"
                        value={payload.query_right}
                        onChange={(e) => setPayload(prev => ({ ...prev, query_right: e.target.value }))}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Display Settings */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">การตั้งค่าการแสดงผล</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Checkboxes */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-blue-800">การแสดงผล</h4>
                      
                      {[
                        { key: 'urgent_color', label: 'สีแสดงความเร่งด่วน' },
                        { key: 'status_patient', label: 'สถานะผู้ป่วย' },
                        { key: 'urgent_level', label: 'แสดงความเร่งด่วน' },
                        { key: 'time_col', label: 'เปิดแถว เวลาที่รอ' },
                        { key: 'arr_l', label: 'เรียงอันดับล่าสุด (ซ้าย)' },
                        { key: 'arr_r', label: 'เรียงอันดับล่าสุด (ขวา)' },
                        { key: 'lock_position', label: 'ล็อคตำแหน่งห้อง (ซ้าย)' },
                        { key: 'lock_position_right', label: 'ล็อคตำแหน่งห้อง (ขวา)' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={payload[item.key as keyof PayloadData] as boolean}
                            onChange={(e) => setPayload(prev => ({ ...prev, [item.key]: e.target.checked }))}
                            className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-blue-700">{item.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-blue-800">เสียง</h4>
                      
                      {[
                        { key: 'a_sound', label: 'คิว ชื่อ นามสกุล' },
                        { key: 'b_sound', label: 'คิว ชื่อ' },
                        { key: 'c_sound', label: 'คิว' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="sound_option"
                            checked={payload[item.key as keyof PayloadData] as boolean}
                            onChange={() => {
                              setPayload(prev => ({
                                ...prev,
                                a_sound: false,
                                b_sound: false,
                                c_sound: false,
                                [item.key]: true
                              }));
                            }}
                            className="w-4 h-4 text-blue-600 border-blue-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-blue-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-5 py-2.5 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ก่อนหน้า</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  ยกเลิก
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-5 py-2.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-sm transition-all duration-200"
                  >
                    <span>ถัดไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-5 py-2.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isLoading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className={`bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-bounce-in pointer-events-auto border-l-4 ${
            successMessage.action === 'ลบ' ? 'border-red-500' : 'border-green-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  successMessage.action === 'ลบ' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {successMessage.action === 'ลบ' ? (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {successMessage.action}ข้อมูลสำเร็จ!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  หน้าจอ ID: <span className="font-semibold text-blue-600">{successMessage.id}</span>
                </p>
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full animate-progress ${
                    successMessage.action === 'ลบ' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                </div>
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

