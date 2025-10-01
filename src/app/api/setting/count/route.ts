import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db-config';

export async function GET() {
  try {
    const connection = await getConnection();
    const result = await connection
      .request()
      .query("SELECT * FROM setting WHERE n_listroom = '2'");

    const count = result.recordset.length || 0;

    // หา ID สูงสุดในฐานข้อมูล
    const maxIdResult = await connection
      .request()
      .query("SELECT MAX(CAST(id AS INT)) as maxId FROM setting WHERE ISNUMERIC(id) = 1");
    
    const maxId = maxIdResult.recordset[0]?.maxId || 0;

    // แมปชื่อ column จากฐานข้อมูลให้ตรงกับที่ front-end ใช้
    const mappedData = result.recordset.map((item: any) => ({
      ...item,
      n_department: item.department,
      head_left: item.n_table,
      head_right: item.n_room,
      amount_left: item.amount_boxL,
      amount_right: item.amount_boxR,
      query_left: item.department_load,
      query_right: item.department_room_load,
    }));

    return NextResponse.json({
      success: true,
      count: count,
      maxId: maxId,
      data: mappedData
    });

  } catch (error: any) {
    console.error('Error getting settings:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error.message,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
