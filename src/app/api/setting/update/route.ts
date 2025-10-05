import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db-config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('📝 กำลังบันทึกข้อมูล monitor:', data.typeMonitor);

    const connection = await getConnection();
    
    // ตรวจสอบว่ามี typeMonitor นี้ในฐานข้อมูลหรือยัง
    const checkResult = await connection
      .request()
      .input('id', data.typeMonitor)
      .query('SELECT id FROM setting WHERE id = @id');

    const exists = checkResult.recordset.length > 0;

    if (exists) {
      // UPDATE ข้อมูลที่มีอยู่
      await connection
        .request()
        .input('id', data.typeMonitor)
        .input('type', data.type || 'single')
        .input('n_hospital', data.n_hospital || '')
        .input('department', data.n_department || '')
        .input('n_table', data.head_left || '')
        .input('n_room', data.head_right || '')
        .input('urgent_setup', data.urgent_setup || 'ฉุกเฉิน')
        .input('time_wait', data.time_wait || 300)
        .input('amount_boxL', data.amount_left || 2)
        .input('amount_boxR', data.amount_right || 2)
        .input('table_arr', data.arr_l ? 'true' : 'false')
        .input('table_arr2', data.arr_r ? 'true' : 'false')
        .input('set_descrip', data.set_descrip ? 'true' : 'false')
        .input('set_notice', data.set_notice ? 'true' : 'false')
        .input('stem_surname', data.stem_surname || 'name')
        .input('stem_popup', data.stem_surname_popup || 'false')
        .input('stem_surname_table', data.stem_surname_table || 'name')
        .input('urgent_color', data.urgent_color ? 'true' : 'false')
        .input('status_patient', data.status_patient ? 'true' : 'false')
        .input('status_check', data.status_check ? 'true' : 'false')
        .input('lock_position', typeof data.lock_position === 'boolean' 
          ? (data.lock_position ? 'true' : 'false') 
          : data.lock_position)
        .input('lock_position_right', data.lock_position_right ? 'true' : 'false')
        .input('urgent_level', data.urgent_level ? 'true' : 'false')
        .input('a_sound', data.a_sound ? 'true' : 'false')
        .input('b_sound', data.b_sound ? 'true' : 'false')
        .input('c_sound', data.c_sound ? 'true' : 'false')
        .input('time_col', data.time_col ? 'true' : 'false')
        .input('station_l', data.station_left || '')
        .input('station_r', data.station_right || '')
        .input('department_load', data.query_left || '2')
        .input('department_room_load', data.query_right || '2')
        .input('listPage', data.listPage || '')
        .query(`UPDATE setting SET 
          type = @type,
          n_hospital = @n_hospital,
          department = @department,
          n_table = @n_table,
          n_room = @n_room,
          urgent_setup = @urgent_setup,
          time_wait = @time_wait,
          amount_boxL = @amount_boxL,
          amount_boxR = @amount_boxR,
          table_arr = @table_arr,
          table_arr2 = @table_arr2,
          set_descrip = @set_descrip,
          set_notice = @set_notice,
          stem_surname = @stem_surname,
          stem_popup = @stem_popup,
          stem_surname_table = @stem_surname_table,
          urgent_color = @urgent_color,
          status_patient = @status_patient,
          status_check = @status_check,
          lock_position = @lock_position,
          lock_position_right = @lock_position_right,
          urgent_level = @urgent_level,
          a_sound = @a_sound,
          b_sound = @b_sound,
          c_sound = @c_sound,
          time_col = @time_col,
          station_l = @station_l,
          station_r = @station_r,
          department_load = @department_load,
          department_room_load = @department_room_load,
          listPage = @listPage
          WHERE id = @id`);
      
      console.log('✅ อัปเดตข้อมูลสำเร็จ');
      
      return NextResponse.json({
        success: true,
        message: 'อัปเดตข้อมูลสำเร็จ',
        action: 'update',
        id: data.typeMonitor
      });
    } else {
      // INSERT ข้อมูลใหม่
      await connection
        .request()
        .input('id', data.typeMonitor)
        .input('type', data.type || 'single')
        .input('n_hospital', data.n_hospital || '')
        .input('department', data.n_department || '')
        .input('n_table', data.head_left || '')
        .input('n_room', data.head_right || '')
        .input('urgent_setup', data.urgent_setup || 'ฉุกเฉิน')
        .input('time_wait', data.time_wait || 300)
        .input('amount_boxL', data.amount_left || 2)
        .input('amount_boxR', data.amount_right || 2)
        .input('table_arr', data.arr_l ? 'true' : 'false')
        .input('table_arr2', data.arr_r ? 'true' : 'false')
        .input('set_descrip', data.set_descrip ? 'true' : 'false')
        .input('set_notice', data.set_notice ? 'true' : 'false')
        .input('stem_surname', data.stem_surname || 'name')
        .input('stem_popup', data.stem_surname_popup || 'false')
        .input('stem_surname_table', data.stem_surname_table || 'name')
        .input('urgent_color', data.urgent_color ? 'true' : 'false')
        .input('status_patient', data.status_patient ? 'true' : 'false')
        .input('status_check', data.status_check ? 'true' : 'false')
        .input('lock_position', typeof data.lock_position === 'boolean' 
          ? (data.lock_position ? 'true' : 'false') 
          : data.lock_position)
        .input('lock_position_right', data.lock_position_right ? 'true' : 'false')
        .input('urgent_level', data.urgent_level ? 'true' : 'false')
        .input('a_sound', data.a_sound ? 'true' : 'false')
        .input('b_sound', data.b_sound ? 'true' : 'false')
        .input('c_sound', data.c_sound ? 'true' : 'false')
        .input('time_col', data.time_col ? 'true' : 'false')
        .input('station_l', data.station_left || '')
        .input('station_r', data.station_right || '')
        .input('department_load', data.query_left || '2')
        .input('department_room_load', data.query_right || '2')
        .input('listPage', data.listPage || '')
        .input('n_listtable', '')
        .input('n_listroom', '2')
        .query(`INSERT INTO setting (
          id, type, n_hospital, department, n_table, n_room, urgent_setup,
          time_wait, amount_boxL, amount_boxR, table_arr, table_arr2, set_descrip,
          set_notice, stem_surname, stem_popup, stem_surname_table,
          urgent_color, status_patient, status_check, lock_position,
          lock_position_right, urgent_level, a_sound, b_sound, c_sound,
          time_col, station_l, station_r, department_load, department_room_load, listPage,
          n_listtable, n_listroom
        ) VALUES (
          @id, @type, @n_hospital, @department, @n_table, @n_room, @urgent_setup,
          @time_wait, @amount_boxL, @amount_boxR, @table_arr, @table_arr2, @set_descrip,
          @set_notice, @stem_surname, @stem_popup, @stem_surname_table,
          @urgent_color, @status_patient, @status_check, @lock_position,
          @lock_position_right, @urgent_level, @a_sound, @b_sound, @c_sound,
          @time_col, @station_l, @station_r, @department_load, @department_room_load, @listPage,
          @n_listtable, @n_listroom
        )`);
      
      console.log('✅ เพิ่มข้อมูลสำเร็จ');
      
      return NextResponse.json({
        success: true,
        message: 'เพิ่มข้อมูลสำเร็จ',
        action: 'insert',
        id: data.typeMonitor
      });
    }
  } catch (error: unknown) {
    console.error('❌ Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error message:', errorMessage);
    
    return NextResponse.json(
      {
        success: false,
        message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + errorMessage,
      },
      { status: 500 }
    );
  }
}