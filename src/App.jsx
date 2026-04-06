import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { toPng } from 'html-to-image'
import './App.css'

function App() {
  const [address, setAddress] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const qrRef = useRef(null)

  const handleDownload = () => {
    if (!qrRef.current) return
    toPng(qrRef.current, { pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'wallet-qr.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => console.error(err))
  }

  const isValid = address.trim().length > 0

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Wallet QR Generator</h1>
        <p className="subtitle">Generate &amp; download QR codes for any wallet address</p>

        <div className="input-group">
          <label htmlFor="address">Wallet Address</label>
          <input
            id="address"
            type="text"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="colors">
          <div className="color-group">
            <label htmlFor="fg">Foreground</label>
            <div className="color-wrap">
              <input
                id="fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
              <span className="color-hex">{fgColor}</span>
            </div>
          </div>
          <div className="color-group">
            <label htmlFor="bg">Background</label>
            <div className="color-wrap">
              <input
                id="bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <span className="color-hex">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="qr-container" ref={qrRef}>
          {isValid ? (
            <QRCodeCanvas
              value={address}
              size={240}
              bgColor={bgColor}
              fgColor={fgColor}
              level="H"
              includeMargin
            />
          ) : (
            <div className="qr-placeholder">
              <span>Enter a wallet address above</span>
            </div>
          )}
        </div>

        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={!isValid}
        >
          ⬇ Download PNG
        </button>
      </div>
    </div>
  )
}

export default App
