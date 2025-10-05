import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db-config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    console.log('🔍 กำลังค้นหา setting id:', id);

    // Query จาก database
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT * FROM setting WHERE id = @id');

    if (!result.recordset || result.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'ไม่พบข้อมูล setting',
        },
        { status: 404 }
      );
    }

    const data = result.recordset[0];
    console.log('✅ พบข้อมูล');

    // แปลง station_left และ station_right จาก string เป็น array
    let station_left = data.station_left;
    let station_right = data.station_right;
    
    if (typeof station_left === 'string') {
      station_left = station_left ? station_left.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];
    } else if (!Array.isArray(station_left)) {
      station_left = [];
    }
    
    if (typeof station_right === 'string') {
      station_right = station_right ? station_right.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];
    } else if (!Array.isArray(station_right)) {
      station_right = [];
    }

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        station_left,
        station_right,
      },
      // รูปแบบเดิมสำหรับ setting page
      hospital: data.n_hospital,
      department: data.n_department,
      head_left: data.head_left,
      head_right: data.head_right,
      amount_left: data.amount_left,
      amount_right: data.amount_right,
      arr_l: data.arr_l,
      arr_r: data.arr_r,
      time_col: data.time_col,
      stem_surname: data.stem_surname,
      stem_surname_popup: data.stem_surname_popup,
      stem_surname_table: data.stem_surname_table,
      urgent_color: data.urgent_color,
      status_patient: data.status_patient,
      status_check: data.status_check,
      lock_position: data.lock_position,
      lock_position_right: data.lock_position_right,
      urgent_level: data.urgent_level,
      a_sound: data.a_sound,
      b_sound: data.b_sound,
      c_sound: data.c_sound,
      query_left: data.query_left,
      query_right: data.query_right,
      ads: data.ads,
    });
  } catch (error: unknown) {
    let message = 'Unknown error';
    let stack: string | undefined = undefined;
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack;
    } else if (typeof error === 'string') {
      message = error;
    }

    console.error('❌ Error:', error);
    console.error('Error message:', message);
    if (stack) {
      console.error('Error stack:', stack);
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล: ' + message,
        error: message,
      },
      { status: 500 }
    );
  }
}