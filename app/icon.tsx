import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  const fontData = readFileSync(
    path.join(
      process.cwd(),
      'KlimTestFonts/Test desktop fonts (Static, OTF)/Test Family/TestFamily-Regular.otf'
    )
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontFamily: 'TestFamily',
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '-0.025em',
          color: '#252525',
        }}
      >
        V2
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'TestFamily',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
