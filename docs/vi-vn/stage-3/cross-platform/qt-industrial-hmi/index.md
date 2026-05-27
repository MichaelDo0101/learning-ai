# Dev Qt desktop industrial — HMI giám sát máy bơm

::: tip Cập nhật 2026
- **Qt 6.8 LTS** stable, support Wayland, Vulkan rendering
- **Qt for Python (PySide6)** mature — Python thay C++ cho dev nhanh
- **Qt for MCUs** cho embedded
- **Qt for WebAssembly** chạy Qt app trong browser
- **VN context**: nhà máy VN đang số hoá, HMI Qt là kỹ năng đắt giá cho industrial automation
:::

## Qt là gì?

Qt là framework C++ cross-platform để build desktop, mobile, embedded apps. Đặc biệt mạnh cho:
- **Industrial HMI** (Human-Machine Interface): nhà máy, automation
- **Medical devices**: máy x-ray, monitor
- **Automotive**: dashboard xe
- **IoT control panel**

**App nổi tiếng dùng Qt**: VirtualBox, OBS Studio, Telegram Desktop, Autodesk Maya, KDE Plasma.

## Tại sao Qt cho industrial?

- **Performance**: native C++, real-time
- **Reliability**: 30+ năm trên thị trường, bullet-proof
- **Cross-platform**: 1 code, deploy Windows, Linux, embedded
- **OpenGL/Vulkan**: render 3D smooth
- **Long support**: LTS 5+ năm
- **Industrial standard**: nhiều SCADA, MES dùng Qt

## Use case: HMI giám sát máy bơm

Build hệ thống monitor nhà máy nước:
- Display real-time data (flow rate, pressure, temperature)
- Alarm khi vượt ngưỡng
- Log historical data
- Manual control valves
- Diagram visual của pipeline

# Chương 1: setup

## 1.1 Cài Qt

**Option A: Qt Online Installer** (chính thức)
1. Download https://www.qt.io/download-qt-installer
2. Open source/commercial — chọn open source (LGPL) cho free
3. Components: Qt 6.8 + Qt Creator + Sources

**Option B: PySide6 (Python)** — đơn giản hơn
```bash
pip install PySide6
```

Bài này dùng **PySide6** cho dev nhanh + AI-friendly.

## 1.2 Hello World

```python
# main.py
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QLabel, QVBoxLayout, QWidget

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("HMI Máy bơm")
        self.resize(800, 600)
        
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Hệ thống giám sát máy bơm"))
        
        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

app = QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
```

Run:
```bash
python main.py
```

# Chương 2: dashboard real-time

## 2.1 Sensor data simulation

```python
import random
from PySide6.QtCore import QTimer, Signal, QObject

class SensorSimulator(QObject):
    data_updated = Signal(dict)
    
    def __init__(self):
        super().__init__()
        self.timer = QTimer()
        self.timer.timeout.connect(self.generate_data)
        self.timer.start(1000)  # mỗi 1s
    
    def generate_data(self):
        data = {
            'flow_rate': round(random.uniform(50, 100), 2),  # m³/h
            'pressure': round(random.uniform(2, 5), 2),       # bar
            'temperature': round(random.uniform(20, 35), 1),  # °C
            'pump_status': random.choice(['ON', 'OFF']),
            'voltage': round(random.uniform(220, 240), 1)     # V
        }
        self.data_updated.emit(data)
```

## 2.2 Real-time gauge widget

```python
from PySide6.QtWidgets import QWidget, QLabel, QVBoxLayout, QHBoxLayout, QFrame
from PySide6.QtCore import Qt, QRect
from PySide6.QtGui import QPainter, QColor, QPen, QFont

class GaugeWidget(QWidget):
    def __init__(self, title, unit, min_val, max_val, warning_threshold):
        super().__init__()
        self.title = title
        self.unit = unit
        self.min_val = min_val
        self.max_val = max_val
        self.warning_threshold = warning_threshold
        self.value = 0
        self.setMinimumSize(200, 200)
    
    def set_value(self, value):
        self.value = value
        self.update()
    
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        # Background arc
        painter.setPen(QPen(QColor("#E5E7EB"), 15))
        painter.drawArc(20, 20, 160, 160, 225 * 16, -270 * 16)
        
        # Value arc
        percentage = (self.value - self.min_val) / (self.max_val - self.min_val)
        percentage = max(0, min(1, percentage))
        angle = -270 * 16 * percentage
        
        color = QColor("#10B981")  # green
        if self.value > self.warning_threshold:
            color = QColor("#EF4444")  # red
        
        painter.setPen(QPen(color, 15))
        painter.drawArc(20, 20, 160, 160, 225 * 16, int(angle))
        
        # Value text
        painter.setPen(QColor("#111827"))
        painter.setFont(QFont("Arial", 24, QFont.Bold))
        painter.drawText(QRect(0, 70, self.width(), 40), Qt.AlignCenter, f"{self.value}")
        
        painter.setFont(QFont("Arial", 12))
        painter.setPen(QColor("#6B7280"))
        painter.drawText(QRect(0, 110, self.width(), 20), Qt.AlignCenter, self.unit)
        
        painter.setFont(QFont("Arial", 14, QFont.Bold))
        painter.setPen(QColor("#374151"))
        painter.drawText(QRect(0, 140, self.width(), 20), Qt.AlignCenter, self.title)
```

## 2.3 Main HMI window

```python
class HMIWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("HMI Giám sát Máy bơm Trạm A")
        self.resize(1200, 800)
        
        # Apply industrial style
        self.setStyleSheet("""
            QMainWindow { background-color: #1F2937; }
            QFrame { background-color: white; border-radius: 8px; }
            QLabel { color: #111827; }
            #title { color: white; font-size: 24px; font-weight: bold; }
            #alarm { background-color: #DC2626; color: white; padding: 10px; border-radius: 4px; }
        """)
        
        # Layout
        main_widget = QWidget()
        main_layout = QVBoxLayout()
        
        # Header
        header = QLabel("HỆ THỐNG GIÁM SÁT MÁY BƠM - TRẠM A")
        header.setObjectName("title")
        header.setAlignment(Qt.AlignCenter)
        main_layout.addWidget(header)
        
        # Gauges row
        gauges_layout = QHBoxLayout()
        self.flow_gauge = GaugeWidget("Lưu lượng", "m³/h", 0, 150, 120)
        self.pressure_gauge = GaugeWidget("Áp suất", "bar", 0, 8, 6)
        self.temp_gauge = GaugeWidget("Nhiệt độ", "°C", 0, 50, 40)
        gauges_layout.addWidget(self.flow_gauge)
        gauges_layout.addWidget(self.pressure_gauge)
        gauges_layout.addWidget(self.temp_gauge)
        main_layout.addLayout(gauges_layout)
        
        # Status row
        status_layout = QHBoxLayout()
        self.pump_status = QLabel("Trạng thái: --")
        self.voltage_label = QLabel("Điện áp: -- V")
        status_layout.addWidget(self.pump_status)
        status_layout.addWidget(self.voltage_label)
        main_layout.addLayout(status_layout)
        
        # Alarm
        self.alarm_label = QLabel("Hệ thống bình thường")
        self.alarm_label.setObjectName("alarm")
        self.alarm_label.setAlignment(Qt.AlignCenter)
        main_layout.addWidget(self.alarm_label)
        
        # Set layout
        main_widget.setLayout(main_layout)
        self.setCentralWidget(main_widget)
        
        # Connect sensor
        self.sensor = SensorSimulator()
        self.sensor.data_updated.connect(self.update_ui)
    
    def update_ui(self, data):
        self.flow_gauge.set_value(data['flow_rate'])
        self.pressure_gauge.set_value(data['pressure'])
        self.temp_gauge.set_value(data['temperature'])
        self.pump_status.setText(f"Trạng thái máy bơm: {data['pump_status']}")
        self.voltage_label.setText(f"Điện áp: {data['voltage']} V")
        
        # Check alarm
        alarms = []
        if data['flow_rate'] > 120:
            alarms.append("LƯU LƯỢNG CAO")
        if data['pressure'] > 6:
            alarms.append("ÁP SUẤT CAO")
        if data['temperature'] > 40:
            alarms.append("NHIỆT ĐỘ CAO")
        
        if alarms:
            self.alarm_label.setText("⚠️ CẢNH BÁO: " + ", ".join(alarms))
            self.alarm_label.setStyleSheet("background-color: #DC2626; color: white; padding: 10px;")
        else:
            self.alarm_label.setText("✅ Hệ thống bình thường")
            self.alarm_label.setStyleSheet("background-color: #10B981; color: white; padding: 10px;")
```

# Chương 3: Modbus/Serial communication

Real HMI cần connect tới PLC qua Modbus TCP hoặc Serial:

```bash
pip install pymodbus pyserial
```

## 3.1 Modbus TCP client

```python
from pymodbus.client import ModbusTcpClient

class ModbusSensor:
    def __init__(self, host, port=502):
        self.client = ModbusTcpClient(host, port)
        self.client.connect()
    
    def read_flow_rate(self):
        # Read register 0x1000 (flow rate, scaled x100)
        result = self.client.read_holding_registers(0x1000, 1, slave=1)
        if result.isError():
            return None
        return result.registers[0] / 100.0
    
    def write_pump_control(self, on: bool):
        # Write coil 0x0001 (pump on/off)
        self.client.write_coil(0x0001, on, slave=1)
```

## 3.2 Serial sensor

```python
import serial
import json

class SerialSensor:
    def __init__(self, port='/dev/ttyUSB0', baud=9600):
        self.ser = serial.Serial(port, baud, timeout=1)
    
    def read_data(self):
        line = self.ser.readline().decode('utf-8').strip()
        try:
            return json.loads(line)  # Sensor send JSON
        except:
            return None
```

# Chương 4: data logging + chart

## 4.1 SQLite logging

```python
import sqlite3
from datetime import datetime

class DataLogger:
    def __init__(self, db_path='hmi_log.db'):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS sensor_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                flow_rate REAL,
                pressure REAL,
                temperature REAL,
                pump_status TEXT
            )
        ''')
    
    def log(self, data):
        self.conn.execute(
            'INSERT INTO sensor_log (flow_rate, pressure, temperature, pump_status) VALUES (?, ?, ?, ?)',
            (data['flow_rate'], data['pressure'], data['temperature'], data['pump_status'])
        )
        self.conn.commit()
    
    def get_last_hours(self, hours=24):
        cursor = self.conn.execute(
            "SELECT * FROM sensor_log WHERE timestamp >= datetime('now', ?)",
            (f'-{hours} hours',)
        )
        return cursor.fetchall()
```

## 4.2 Chart với pyqtgraph

```bash
pip install pyqtgraph
```

```python
import pyqtgraph as pg
from collections import deque

class TrendChart(pg.PlotWidget):
    def __init__(self, title):
        super().__init__()
        self.setBackground('w')
        self.setTitle(title, color='#111827', size='14pt')
        self.setLabel('left', 'Giá trị')
        self.setLabel('bottom', 'Thời gian (giây)')
        self.showGrid(x=True, y=True)
        
        self.x_data = deque(maxlen=60)
        self.y_data = deque(maxlen=60)
        self.curve = self.plot(pen=pg.mkPen('#4F46E5', width=2))
    
    def update(self, value):
        if not self.x_data:
            self.x_data.append(0)
        else:
            self.x_data.append(self.x_data[-1] + 1)
        self.y_data.append(value)
        self.curve.setData(list(self.x_data), list(self.y_data))
```

# Chương 5: AI-assisted Qt dev với Claude/Cursor

```bash
# Prompt cho Cursor:
"Implement dialog box trong PySide6 cho user input:
- Field IP address PLC
- Port Modbus
- Username/password
- Test connection button
- Save button
Validation: IP format đúng, port số

Style: industrial dark theme."
```

AI gen code Qt, paste vào project, refine.

# Chương 6: build và deploy

## 6.1 Package với PyInstaller

```bash
pip install pyinstaller

pyinstaller --onefile --windowed --icon=icon.ico \
  --name "HMI-Pump-Monitor" \
  --add-data "assets:assets" \
  main.py
```

Output `.exe` (Windows), `.app` (Mac), executable (Linux) trong `dist/`.

## 6.2 Industrial deployment

Trong nhà máy thường deploy lên:
- **Industrial PC** (IPC) — Windows/Linux
- **Touch panel** — Linux ARM
- **Raspberry Pi 5** — cheap, Qt for Embedded

Cross-compile cho ARM:
```bash
# Trên Linux x86
sudo apt install crossbuild-essential-armhf
pyinstaller --onefile main.py --target arm
```

# Chương 7: best practice industrial

## 7.1 Safety

- **Failsafe defaults**: nếu connect mất, pump OFF
- **Watchdog**: monitor app crash, auto-restart
- **Audit log**: log mọi user action
- **2-factor confirm** cho action critical (stop pump)
- **Network redundancy**: dual Ethernet

## 7.2 Performance

- **Update rate**: UI 10Hz đủ, log 1Hz đủ
- **Don't block UI thread**: I/O trong QThread
- **Memory management**: cleanup QObject parent-child
- **GPU rendering**: OpenGL cho 3D pipeline

## 7.3 Reliability

- **Recovery**: auto-restart Modbus connection
- **Graceful degradation**: lose 1 sensor, app vẫn chạy
- **Error logging**: structured log (JSON), rotate
- **Health check endpoint**: monitor từ remote

## 7.4 Security

- **Network**: VLAN cách ly OT/IT
- **Auth**: LDAP/AD integration cho enterprise
- **HTTPS** cho remote dashboard
- **Firmware verify**: signature check trước update
- **Backup config**: version control

# Câu hỏi thường gặp

### Q1: Qt vs Electron cho industrial?

| | Qt | Electron |
|---|---|---|
| Performance | Native C++/Python | Web-based, hơn nặng |
| Memory | 50-100MB | 200-500MB |
| Industrial integration | Mature (Modbus, OPC UA) | Cần plugin |
| Long-term support | LTS 5 năm | 1-2 năm |
| Best for | Industrial HMI | Office software |

### Q2: Qt vs LabVIEW?

LabVIEW chuyên cho data acquisition + automation, drag-drop visual programming. Qt linh hoạt hơn cho UI custom, dev hiệu quả hơn cho dev kinh nghiệm.

### Q3: License Qt?

- **LGPL** (free): với điều kiện dynamic link Qt library
- **Commercial** ($5000+/năm/seat): static link, no copyleft

Most open source project dùng LGPL OK. Industrial product nên xét commercial cho convenience.

### Q4: PySide6 vs PyQt6?

- **PySide6** official Qt, LGPL — khuyến nghị
- **PyQt6** community, GPL/commercial — restrictions hơn

Code gần giống, có thể migrate dễ.

### Q5: VN có job Qt industrial không?

Có. Các công ty automation VN:
- Schneider Electric, Siemens VN
- LS Electric, Mitsubishi VN
- Nhà máy thuỷ điện, dệt may, dầu khí

Salary senior Qt industrial dev: 30-60 triệu/tháng (VN), $5000+/tháng remote.

# Tài liệu tham khảo

- [Qt official docs](https://doc.qt.io/)
- [PySide6 tutorial](https://doc.qt.io/qtforpython-6/)
- [pyqtgraph](https://www.pyqtgraph.org/)
- [pymodbus](https://pymodbus.readthedocs.io/)
- [Qt for Industrial](https://www.qt.io/industries/industrial-automation)

---

# Phụ lục: Industrial dev 2026 cho VN

## A. Trend Q1-Q2 2026

- **Industry 4.0** push từ Bộ Công Thương — nhiều cơ hội tại VN
- **OPC UA** thành chuẩn cho communication
- **Edge computing** với Raspberry Pi 5 / NVIDIA Jetson
- **Digital twin**: simulate plant trước build
- **AR maintenance**: HoloLens, AR app cho field engineer

## B. Stack industrial VN 2026

```
HMI: PySide6 / Qt C++ + QML
Communication: Modbus TCP, OPC UA, MQTT
Database: TimescaleDB (time-series), InfluxDB
Dashboard: Grafana cho remote monitor
Edge: Raspberry Pi 5 / NVIDIA Jetson + Qt for Embedded
Cloud: AWS IoT, Azure IoT Hub, ThingsBoard self-host
Protocol: Modbus, BACnet, EtherCAT, Profinet
```

## C. Use case VN

| Domain | Application |
|---|---|
| Nhà máy nước | HMI monitor pump, valve, water quality |
| Dệt may | Production line monitor, defect detection AI |
| Thuỷ điện | Turbine monitor, dam level |
| Dầu khí | Pipeline monitor, leak detection |
| Smart farm | Greenhouse climate control |
| Cảng biển | Container tracking, crane operation |
| Manufacturing | OEE dashboard, predictive maintenance |

## D. Career path

1. **Junior PLC + HMI**: 10-20tr/tháng, học Siemens/Schneider, Mitsubishi
2. **Mid SCADA dev**: 20-40tr, master Qt/WinCC/iFix
3. **Senior automation engineer**: 40-80tr, full system design
4. **Tech lead/consultant**: 80-200tr, lead big project

## Sources

- [Qt for Industrial Automation](https://www.qt.io/industries/industrial-automation)
- [OPC UA standard](https://opcfoundation.org/)
- [Industry 4.0 VN](https://industry40.vn/)
- [Schneider Electric VN](https://www.se.com/vn/)
