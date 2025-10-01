<?php
include '../configdb.php';
session_start();
$status = isset($_SESSION['status']);
$message = isset($_SESSION['message']);

if ($status === 'success') {
  echo '
    <div class="bg-[#1eb510] rounded-md px-6 py-2 w-40">
      <span class="text-white font-medium">' . htmlspecialchars($message) . '</span>
    </div>';
} else if ($status === 'error') {
  echo '
    <div class="bg-[#cc0606] rounded-md px-6 py-2 w-40">
      <span class="text-white font-medium">' . htmlspecialchars($message) . '</span>
    </div>';
} else {
  echo '';
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Setting</title>
  <link rel="icon" href="./src/image/logo_hospitol.png" />
  <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');

  * {
    font-family: "IBM Plex Sans Thai", serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

<body class="bg-[#f0f0f0] p-6">
  <div class="flex gap-3">
    <aside class="bg-white p-4 rounded-[20px] w-[300px] flex flex-col justify-start gap-20 fixed"
      style="height: calc(100vh - 50px)">
      <div class="flex flex-col items-center justify-center gap-2">
        <img src="./src/image/logo_hospitol.png" alt="" class="w-14" />
        <h1 class="text-[#020f24] font-medium text-2xl">SETTING</h1>
      </div>

      <ul class="flex flex-col gap-4 w-full">
        <li>
          <a href="./index.php"
            class="block text-gray-700 px-4 py-2 w-full hover:bg-[#f1f5f9] rounded-lg transition-colors duration-200">หน้าแรก</a>
        </li>
        <li>
          <a href=""
            class="block rounded-xl text-white bg-[#011d4a] px-4 py-2 w-full hover:bg-[#1a2533] transition-colors duration-200">การตั้งค่า</a>
        </li>
        <li>
          <a href="./manage.php"
            class="block text-gray-700 px-4 py-2 w-full hover:bg-[#f1f5f9] rounded-lg transition-colors duration-200">การจัดการ</a>
        </li>
        <li>
          <a href="./contact.php"
            class="block text-gray-700 px-4 py-2 w-full hover:bg-[#f1f5f9] rounded-lg transition-colors duration-200">ติดต่อเจ้าหน้าที่</a>
        </li>
        <li>
          <a href="./ads.php"
            class="block text-gray-700 px-4 py-2 w-full hover:bg-[#f1f5f9] rounded-lg transition-colors duration-200">โฆษณา</a>
        </li>
      </ul>
    </aside>

    <section class="bg-white w-full p-4 rounded-[20px] ml-[310px]">
      <div class="flex items-center justify-end px-4 py-2">
        <h1 class="font-semibold">การตั้งค่า | Setting</h1>
      </div>

      <div>
        <h1 class="text-2xl font-bold">ตั้งค่าหน้าจอ</h1>
        <div class="mt-10">
          <form class="w-full flex flex-col items-center justify-center" action="./change.php" method="POST">
            <label for="monitor" class="block mb-2 text-sm font-medium text-gray-900">ตำแหน่งจอ</label>
            <select id="typeMonitor" name="typeMonitor"
              class="max-w-sm bg-gray-100 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5">
              <option selected>โปรดเลือกหน้าจอ</option>
              <option value="201">หน้าจอที่ 1</option>
              <option value="202">หน้าจอที่ 2</option>
              <option value="203">หน้าจอที่ 3</option>
              <option value="204">หน้าจอที่ 4</option>
              <option value="205">หน้าจอที่ 5</option>
              <option value="206">หน้าจอที่ 6</option>
              <option value="207">หน้าจอที่ 7</option>
              <option value="208">หน้าจอที่ 8</option>
              <option value="209">หน้าจอที่ 9</option>
              <option value="210">หน้าจอที่ 10</option>
              <hr>
              <option value="211">หน้าจอที่ 11</option>
              <option value="212">หน้าจอที่ 12</option>
              <option value="213">หน้าจอที่ 13</option>
              <option value="214">หน้าจอที่ 14</option>
              <option value="215">หน้าจอที่ 15</option>
              <option value="216">หน้าจอที่ 16</option>
              <option value="217">หน้าจอที่ 17</option>
              <option value="218">หน้าจอที่ 18</option>
              <option value="219">หน้าจอที่ 19</option>
              <option value="220">หน้าจอที่ 20</option>
              <option value="221">หน้าจอที่ 21</option>
              <option value="222">หน้าจอที่ 22</option>
              <option value="223">หน้าจอที่ 23</option>
              <option value="1111">พุนพิน 1</option>
              <option value="1112">พุนพิน 2</option>
            </select>


            <div class="px-32 w-full">

              <div class="flex flex-col items-ce justify-center mt-10 gap-6 w-full">
                <h1>| ส่วนหัว</h1>
                <div class="flex gap-6 w-full items-center justify-center">
                  <input type="text" id="n_hospital" name="n_hospital"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ชื่อโรงพยาบาล" />
                  <input type="text" id="n_department" name="n_department"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full" placeholder="ชื่อแผนก" />
                </div>
                <div class="flex gap-6 w-full items-center justify-center">
                  <input type="text" id="head_left" name="head_left"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ชื่อหัวตาราง (ฝั่งซ้าย)" />
                  <input type="text" id="head_right" name="head_right"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ชื่อหัวตาราง (ฝั่งขวา)" />
                </div>
              </div>
              <hr class="border border-gray-300 rounded-xl w-full mt-8">
              <div class="flex flex-col items-start justify-start mt-10 gap-6 w-full">
                <h1>| ส่วนตาราง</h1>
                <div class="flex gap-6 w-full">
                  <input type="number" id="amount_left" name="amount_left"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="จำนวนห้อง (ซ้าย)" />

                  <input type="number" id="amount_right" name="amount_right"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="จำนวนห้อง (ขวา)" />
                </div>
                <!-- <hr class="border border-gray-300 rounded-xl w-full"> -->
                <div class="flex items-center w-full">
                  <div class="border border-gray-300 flex-grow"></div>
                  <div class="px-3 text-gray-400 text-sm">แก้ไขชื่อ</div>
                  <div class="border border-gray-300 flex-grow"></div>
                </div>
                <div class="w-full flex gap-4">
                  <div id="inputLeft" class="flex flex-col gap-4 w-[50%]">
                  </div>
                  <div id="inputRight" class="flex flex-col gap-4 w-[50%]">
                  </div>
                </div>
                <div class="flex gap-10 w-full items-center justify-center">
                  <div class="flex items-center  ps-4 border border-gray-200 rounded-xl px-6 w-full">
                    <input id="time_col" type="checkbox" value="true" name="time_col"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      เปิดแถว เวลาที่รอ</label>
                  </div>

                  <div class="flex items-center  ps-4 border border-gray-200 rounded-xl px-6 w-full">
                    <input id="all_queue" type="checkbox" value="true" name="all_queue"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      เปิดการรวมคิว</label>
                  </div>

                </div>


                <div class="flex gap-10 w-full items-center justify-center mt-10">

                  <div class="flex items-center  ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="lock_position" type="checkbox" value="true" name="lock_position"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ล็อคตำแหน่งห้อง (ซ้าย)</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="lock_position_right" type="checkbox" value="true" name="lock_position_right"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ล็อคตำแหน่งห้อง (ขวา)</label>
                  </div>
                </div>
                <div class="flex gap-10 w-full items-center justify-center mt-10">

                  <div class="flex items-center  ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="arr_l" type="checkbox" value="true" name="arr_l"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      เรียงอันดับล่าสุด (ซ้าย)</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="arr_r" type="checkbox" value="true" name="arr_r"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      เรียงอันดับล่าสุด (ขวา)</label>
                  </div>
                </div>
                <div class="flex gap-10 w-full items-center justify-center mt-10">

                  <div class="flex items-center  ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_surname" type="checkbox" value="true" name="stem_surname"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดนามสกุลห้อง</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_surname_table" type="checkbox" value="true" name="stem_surname_table"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดนามสกุลตาราง</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_surname_popup" type="checkbox" value="true" name="stem_surname_popup"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดนามสกุลป๊อบอัพ</label>
                  </div>
                </div>



                <div class="flex gap-10 w-full items-center justify-center mt-10">
                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_name" type="checkbox" value="true" name="stem_name"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดชื่อห้อง</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_name_table" type="checkbox" value="true" name="stem_name_table"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดชื่อตาราง</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="stem_name_popup" type="checkbox" value="true" name="stem_name_popup"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      ปิดชื่อป๊อบอัพ</label>
                  </div>
                </div>

                <div class="flex gap-10 w-full items-start justify-start mt-10">
                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-1/4">
                    <input id="urgent_color" type="checkbox" value="true" name="urgent_color"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      สีแสดงความเร่งด่วน</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-1/4">
                    <input id="urgent_level" type="checkbox" value="true" name="urgent_level"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      แสดงความเร่งด่วน</label>
                  </div>
                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-1/4">
                    <input id="status_patient" type="checkbox" value="true" name="status_patient"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      สถานะผู้ป่วย</label>
                  </div>
                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-1/4">
                    <input id="status_check" type="checkbox" value="true" name="status_check"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      รูปแบบ รอการตรวจสอบ</label>
                  </div>
                </div>


                <h1 class="mt-10">| เสียง</h1>
                <div class="flex gap-10 w-full items-center justify-center">
                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="a_sound" type="radio" value="true" name="sound_option"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="a_sound" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      คิว ชื่อ นามสกุล</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="b_sound" type="radio" value="true" name="sound_option"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="b_sound" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      คิว ชื่อ</label>
                  </div>

                  <div class="flex items-center ps-4 border border-gray-200 rounded-xl w-full">
                    <input id="c_sound" type="radio" value="true" name="sound_option"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="c_sound" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                      คิว</label>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-start justify-start mt-10 gap-2 w-full">
                <h1>| Form Query</h1>
                <p class="text-sm text-gray-500 mb-6">รูปแบบการคิวรี่ เช่น ห้องตรวจ 1,ห้องตรวจ 2</p>
                <div class="flex gap-6 w-full">
                  <input type="text" id="query_left" name="query_left"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ข้อมูลฝั่งซ้าย" />
                  <input type="text" id="query_right" name="query_right"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ข้อมูลฝั่งขวา" />
                </div>
              </div>
              <div class="flex flex-col items-start justify-start mt-10 gap-2 w-full">
                <h1>| ADS</h1>
                <p class="text-sm text-gray-500 mb-6">ที่อยู่ของรูปภาพ</p>
                <div class="flex gap-6 w-full">
                  <input type="text" id="ads" name="ads"
                    class="bg-gray-50 border text-start rounded-lg border-gray-300 w-full"
                    placeholder="ลิงค์หรือ ที่อยู่ของรูปภาพ" />
                </div>
              </div>

            </div>



            <div class="flex w-full items-end justify-end mt-6 px-32">
              <button type="submit" id="submit"
                class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    document.getElementById('typeMonitor').addEventListener("change", function () {
      const monitorId = this.value;

      if (monitorId !== 'โปรดเลือกหน้าจอ') {
        fetch("./datasetting.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `monitorId=${monitorId}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              document.getElementById('n_hospital').value = data.hospital;
              document.getElementById('n_department').value = data.department;
              document.getElementById('head_left').value = data.head_left;
              document.getElementById('head_right').value = data.head_right;
              // document.getElementById('list_left').value = data.list_left;
              // document.getElementById('list_right').value = data.list_right;
              document.getElementById('amount_left').value = data.amount_left;
              document.getElementById('amount_right').value = data.amount_right;
              document.getElementById('query_left').value = data.query_left;
              document.getElementById('query_right').value = data.query_right;
              document.getElementById('ads').value = data.ads;

              document.getElementById('arr_l').checked = data.arr_l === "true";
              document.getElementById('arr_r').checked = data.arr_r === "true";
              document.getElementById('time_col').checked = data.time_col === "true";
              document.getElementById('stem_surname').checked = data.stem_surname === "true";
              document.getElementById('stem_name').checked = data.stem_surname === "name";
              document.getElementById('stem_surname_table').checked = data.stem_surname_table === "true";
              document.getElementById('stem_name_table').checked = data.stem_surname_table === "name";
              document.getElementById('stem_surname_popup').checked = data.stem_surname_popup === "true";
              document.getElementById('status_patient').checked = data.status_patient === "true";
              document.getElementById('status_check').checked = data.status_check === "true";
              document.getElementById('lock_position').checked = data.lock_position === "true";
              document.getElementById('lock_position_right').checked = data.lock_position_right === "true";
              document.getElementById('urgent_color').checked = data.urgent_color === "true";
              document.getElementById('stem_name_popup').checked = data.stem_surname_popup === "name";
              document.getElementById('all_queue').checked = data.lock_position === "all_queue";
              document.getElementById('urgent_level').checked = data.urgent_level === "true";
              document.getElementById('a_sound').checked = data.a_sound === "true";
              document.getElementById('b_sound').checked = data.b_sound === "true";
              document.getElementById('c_sound').checked = data.c_sound === "true";

              document.getElementById('stem_name_popup').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_surname_popup').checked = false;
                }
              });

              document.getElementById('stem_surname_popup').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_name_popup').checked = false;
                }
              });

              document.getElementById('stem_surname_table').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_name_table').checked = false;
                }
              });
              document.getElementById('stem_name_table').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_surname_table').checked = false;
                }
              });

              document.getElementById('stem_name').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_surname').checked = false;
                }
              });
              document.getElementById('stem_surname').addEventListener('change', function () {
                if (this.checked) {
                  document.getElementById('stem_name').checked = false;
                }
              });


              // ===============สร้า่ง input แบบไดนามิก================
              function createinput(container, amount, prefix, name, values) {
                container.innerHTML = "";
                for (let i = 0; i < amount; i++) {
                  const input = document.createElement("input");
                  input.type = "text";
                  input.name = `${prefix}${i + 1}`;
                  input.id = `${prefix}${i + 1}`;
                  input.placeholder = `${name} ${i + 1}`;
                  input.className = "bg-gray-50 border text-start rounded-lg border-gray-300 w-full";
                  input.value = values && values[i] ? values[i] : "";
                  input.addEventListener('input', mergeInputValues);
                  container.appendChild(input);
                }
              }

              createinput(document.getElementById('inputLeft'), data.amount_left, "station_left", "ชื่อห้องที่ ", data.station_left);
              createinput(document.getElementById('inputRight'), data.amount_right, "station_right", "ชื่อห้องที่ ", data.station_right);

              document.getElementById('amount_left').addEventListener("input", function () {
                const newAmount = parseInt(this.value, 10) || 0;
                const newValues = data.station_left.slice(0, newAmount);
                createinput(document.getElementById('inputLeft'), newAmount, "station_left", "ชื่อห้องที่ ", newValues);
                mergeInputValues();
              });
              document.getElementById('amount_right').addEventListener("input", function () {
                const newAmount = parseInt(this.value, 10) || 0;
                const newValues = data.station_left.slice(0, newAmount);
                createinput(document.getElementById('inputRight'), newAmount, "station_right", "ชื่อห้องที่ ", newValues);
                mergeInputValues();
              });

              let mergeInputLeft = '';
              let mergeInputRight = '';

              function mergeInputValues() {
                mergeInputLeft = '';
                mergeInputRight = '';

                const inputLeftFields = document.querySelectorAll('#inputLeft input');
                inputLeftFields.forEach(input => {
                  if (input.value) {
                    mergeInputLeft += input.value + ',';
                  }
                });

                const inputRightFields = document.querySelectorAll('#inputRight input');
                inputRightFields.forEach(input => {
                  if (input.value) {
                    mergeInputRight += input.value + ',';
                  }
                });

                mergeInputLeft = mergeInputLeft.replace(/,$/, '');
                mergeInputRight = mergeInputRight.replace(/,$/, '');

                console.log('Merged Values Left:', mergeInputLeft);
                console.log('Merged Values Right:', mergeInputRight);
              }

              mergeInputValues();

              console.log('Data:', monitorId);

              function sendMergedValues() {
                mergeInputValues();
                const formData = new URLSearchParams();

                formData.append('ads', document.getElementById('ads').value);
                formData.append('typeMonitor', document.getElementById('typeMonitor').value);
                formData.append('n_hospital', document.getElementById('n_hospital').value);
                formData.append('n_department', document.getElementById('n_department').value);
                formData.append('head_left', document.getElementById('head_left').value);
                formData.append('head_right', document.getElementById('head_right').value);
                // formData.append('list_left', document.getElementById('list_left').value);
                // formData.append('list_right', document.getElementById('list_right').value);
                formData.append('amount_left', document.getElementById('amount_left').value);
                formData.append('amount_right', document.getElementById('amount_right').value);
                formData.append('arr_l', document.getElementById('arr_l').checked ? 'true' : 'false');
                formData.append('arr_r', document.getElementById('arr_r').checked ? 'true' : 'false');
                // formData.append('stem_surname', document.getElementById('stem_surname').checked);
                formData.append('stem_surname', document.getElementById('stem_name').checked ? "name" : (document.getElementById('stem_surname').checked ? "true" : "false"));
                formData.append('stem_surname_popup', document.getElementById('stem_name_popup').checked ? "name" : (document.getElementById('stem_surname_popup').checked ? "true" : "false"));
                formData.append('stem_surname_table', document.getElementById('stem_name_table').checked ? "name" : (document.getElementById('stem_surname_table').checked ? "true" : "false"));
                // formData.append('stem_name', document.getElementById('stem_name').checked);
                formData.append('urgent_color', document.getElementById('urgent_color').checked);
                formData.append('status_patient', document.getElementById('status_patient').checked);
                formData.append('status_check', document.getElementById('status_check').checked);
                formData.append('lock_position', document.getElementById('lock_position').checked);
                formData.append('lock_position', document.getElementById('all_queue').checked ? "all_queue" : "false");
                formData.append('lock_position_right', document.getElementById('lock_position_right').checked);
                formData.append('urgent_level', document.getElementById('urgent_level').checked);
                formData.append('a_sound', document.getElementById('a_sound').checked);
                formData.append('b_sound', document.getElementById('b_sound').checked);
                formData.append('c_sound', document.getElementById('c_sound').checked);
                formData.append('time_col', document.getElementById('time_col').checked);
                formData.append('station_left', mergeInputLeft);
                formData.append('station_right', mergeInputRight);
                formData.append('query_left', document.getElementById('query_left').value);
                formData.append('query_right', document.getElementById('query_right').value);

                console.log('Form Data:', formData.toString());
                fetch('./change.php', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: formData.toString()
                })
                  .then(response => response.text())
                  .then(data => {
                    console.log('Success:', data);
                  })
                  .catch(error => console.error('Error:', error));
              }

              document.getElementById('submit').addEventListener("click", function (event) {
                event.preventDefault();
                sendMergedValues();
              });

            } else {
              Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูลตำแหน่งจอ",
                text: "ไม่พบข้อมูลตำแหน่งจอ ลองใหม่อีกครั้ง"
              });
            }
          })
          .catch((error) => console.log("Error", error));
      }
    });
  </script>
</body>

</html>