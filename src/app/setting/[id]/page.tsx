'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Settings, CheckCircle } from 'lucide-react';

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
  stem_name: string;
  stem_name_table: string;
  stem_name_popup: string;
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

export default function EditSettingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
    stem_name: 'name',
    stem_name_table: 'name',
    stem_name_popup: 'false',
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

  // Fetch setting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(`/api/setting/${resolvedParams.id}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          const data = result.data;
          setPayload({
            type: data.type || 'ประเภทหน้าจอ',
            typeMonitor: resolvedParams.id,
            n_hospital: data.n_hospital || '',
            n_department: data.department || '',
            head_left: data.n_table || '',
            head_right: data.n_room || '',
            urgent_setup: data.urgent_setup || 'ฉุกเฉิน',
            time_wait: data.time_wait || 300,
            amount_left: data.amount_boxL || 2,
            amount_right: data.amount_boxR || 2,
            arr_l: data.table_arr === 'true',
            arr_r: data.table_arr2 === 'true',
            set_descrip: data.set_descrip === 'true',
            set_notice: data.set_notice === 'true',
            stem_surname: data.stem_surname || 'name',
            stem_surname_popup: data.stem_popup || 'false',
            stem_surname_table: data.stem_surname_table || 'name',
            stem_name: data.stem_name || 'name',
            stem_name_table: data.stem_name_table || 'name',
            stem_name_popup: data.stem_name_popup || 'false',
            urgent_color: data.urgent_color === 'true',
            status_patient: data.status_patient === 'true',
            status_check: data.status_check === 'true',
            lock_position: data.lock_position === 'true',
            lock_position_right: data.lock_position_right === 'true',
            urgent_level: data.urgent_level === 'true',
            a_sound: data.a_sound === 'true',
            b_sound: data.b_sound === 'true',
            c_sound: data.c_sound === 'true',
            time_col: data.time_col === 'true',
            station_left: data.station_l || '',
            station_right: data.station_r || '',
            query_left: data.department_load || '2',
            query_right: data.department_room_load || '2',
            listPage: data.listPage || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmPopup(true);
  };

  // Handle confirm submit
  const handleConfirmSubmit = async () => {
    setShowConfirmPopup(false);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/setting/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.success) {
        setShowSuccessPopup(true);
        // Auto redirect after 2 seconds
        setTimeout(() => {
          router.push('/setting');
        }, 2000);
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

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: '#043566', borderTopColor: 'transparent' }}></div>
          <p className="text-slate-600 font-medium">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl shadow-md" style={{ background: 'linear-gradient(135deg, #043566, #065a9e)' }}>
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#043566' }}>แก้ไขการตั้งค่า</h1>
                <p className="text-sm text-slate-600 mt-1">แก้ไขการตั้งค่าหน้าจอ ID: {resolvedParams.id}</p>
              </div>
            </div>
            <Link
              href="/setting"
              className="flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-slate-50 rounded-xl transition-all duration-200 border shadow-sm hover:shadow font-medium"
              style={{ color: '#043566', borderColor: '#e2e8f0' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>กลับ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
            {/* Basic Info Section */}
            <div className="px-6 py-5 border-b" style={{ background: 'rgba(4, 53, 102, 0.02)', borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-bold" style={{ color: '#043566' }}>ข้อมูลพื้นฐาน</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ID หน้าจอ</label>
                  <input
                    type="text"
                    value={payload.typeMonitor}
                    disabled
                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อโรงพยาบาล</label>
                  <input
                    type="text"
                    value={payload.n_hospital}
                    onChange={(e) => setPayload(prev => ({ ...prev, n_hospital: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">แผนก</label>
                  <input
                    type="text"
                    value={payload.n_department}
                    onChange={(e) => setPayload(prev => ({ ...prev, n_department: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">หัวตาราง (ซ้าย)</label>
                  <input
                    type="text"
                    value={payload.head_left}
                    onChange={(e) => setPayload(prev => ({ ...prev, head_left: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">หัวตาราง (ขวา)</label>
                  <input
                    type="text"
                    value={payload.head_right}
                    onChange={(e) => setPayload(prev => ({ ...prev, head_right: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">เวลารอ (วินาที)</label>
                  <input
                    type="number"
                    value={payload.time_wait}
                    onChange={(e) => setPayload(prev => ({ ...prev, time_wait: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>
              </div>
            </div>

            {/* Table Settings Section */}
            <div className="px-6 py-5 border-t border-b" style={{ background: 'rgba(4, 53, 102, 0.02)', borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-bold" style={{ color: '#043566' }}>การตั้งค่าตาราง</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">จำนวนห้อง (ซ้าย)</label>
                  <input
                    type="number"
                    value={payload.amount_left}
                    onChange={(e) => setPayload(prev => ({ ...prev, amount_left: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">จำนวนห้อง (ขวา)</label>
                  <input
                    type="number"
                    value={payload.amount_right}
                    onChange={(e) => setPayload(prev => ({ ...prev, amount_right: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อโต๊ะ (ซ้าย)</label>
                  <textarea
                    value={payload.station_left}
                    onChange={(e) => setPayload(prev => ({ ...prev, station_left: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                    rows={3}
                    placeholder="เช่น โต๊ะซักประวัติ 1,โต๊ะซักประวัติ 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อโต๊ะ (ขวา)</label>
                  <textarea
                    value={payload.station_right}
                    onChange={(e) => setPayload(prev => ({ ...prev, station_right: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                    rows={3}
                    placeholder="เช่น โต๊ะตรวจ 1,โต๊ะตรวจ 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Department ID (ซ้าย)</label>
                  <input
                    type="text"
                    value={payload.query_left}
                    onChange={(e) => setPayload(prev => ({ ...prev, query_left: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Department ID (ขวา)</label>
                  <input
                    type="text"
                    value={payload.query_right}
                    onChange={(e) => setPayload(prev => ({ ...prev, query_right: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 transition-all shadow-sm"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                </div>
              </div>
            </div>

            {/* Display Settings Section */}
            <div className="px-6 py-5 border-t border-b" style={{ background: 'rgba(4, 53, 102, 0.02)', borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-bold" style={{ color: '#043566' }}>การตั้งค่าการแสดงผล</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Checkboxes */}
                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>การแสดงผล</h4>
                  
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
                    <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={payload[item.key as keyof PayloadData] as boolean}
                        onChange={(e) => setPayload(prev => ({ ...prev, [item.key]: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                        style={{ accentColor: '#043566' }}
                      />
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>เสียง</h4>
                  
                  {[
                    { key: 'a_sound', label: 'คิว ชื่อ นามสกุล' },
                    { key: 'b_sound', label: 'คิว ชื่อ' },
                    { key: 'c_sound', label: 'คิว' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
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
                        className="w-4 h-4 border-gray-300 focus:ring-2"
                        style={{ accentColor: '#043566' }}
                      />
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>การแสดงข้อมูลเพิ่มเติม</h4>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.set_descrip}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        set_descrip: e.target.checked 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">แสดง Description</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.set_notice}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        set_notice: e.target.checked 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">แสดง Notice</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Hide Settings Section */}
            <div className="px-6 py-5 border-t border-b" style={{ background: 'rgba(4, 53, 102, 0.02)', borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-bold" style={{ color: '#043566' }}>การตั้งค่าการซ่อนข้อมูล</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>การซ่อนข้อมูลในห้อง</h4>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_name === 'hide'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_name: e.target.checked ? 'hide' : 'name' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">ปิดชื่อห้อง</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_surname === 'true'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_surname: e.target.checked ? 'true' : 'name' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">ปิดนามสกุลห้อง</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>การซ่อนข้อมูลในตาราง</h4>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_name_table === 'hide'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_name_table: e.target.checked ? 'hide' : 'name' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">ปิดชื่อตาราง</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_surname_table === 'true'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_surname_table: e.target.checked ? 'true' : 'name' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">ปิดนามสกุลตาราง</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: '#043566' }}>การซ่อนข้อมูลในป๊อปอัพ</h4>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_name_popup === 'true'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_name_popup: e.target.checked ? 'true' : 'false' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">แสดงชื่อป๊อปอัพ</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payload.stem_surname_popup === 'true'}
                      onChange={(e) => setPayload(prev => ({ 
                        ...prev, 
                        stem_surname_popup: e.target.checked ? 'true' : 'false' 
                      }))}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: '#043566' }}
                    />
                    <span className="text-sm text-slate-700">ปิดนามสกุลป๊อปอัพ</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex items-center justify-between" style={{ background: 'rgba(4, 53, 102, 0.01)', borderColor: '#e2e8f0' }}>
              <Link
                href="/setting"
                className="px-5 py-2.5 text-slate-600 bg-white border rounded-xl hover:bg-slate-50 shadow-sm hover:shadow transition-all duration-200"
                style={{ borderColor: '#e2e8f0' }}
              >
                ยกเลิก
              </Link>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 px-5 py-2.5 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-md transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #043566, #065a9e)' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>กำลังบันทึก...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>บันทึกการเปลี่ยนแปลง</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Save className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">ยืนยันการบันทึก</h3>
                  <p className="text-sm text-slate-600">คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-700">
                  การเปลี่ยนแปลงจะถูกบันทึกลงในระบบและจะมีผลทันที
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="flex-1 px-4 py-2.5 text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  style={{ background: 'linear-gradient(135deg, #043566, #065a9e)' }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>กำลังบันทึก...</span>
                    </div>
                  ) : (
                    'ยืนยัน'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-100">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">บันทึกข้อมูลสำเร็จ!</h3>
              <p className="text-slate-600 mb-6">
                การเปลี่ยนแปลงได้ถูกบันทึกลงในระบบเรียบร้อยแล้ว
              </p>

              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-700">
                  กำลังนำคุณกลับไปยังหน้ารายการการตั้งค่า...
                </p>
              </div>

              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  router.push('/setting');
                }}
                className="w-full px-4 py-2.5 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium"
                style={{ background: 'linear-gradient(135deg, #043566, #065a9e)' }}
              >
                กลับไปหน้ารายการ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

