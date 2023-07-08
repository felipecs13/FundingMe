import { ConfigProvider } from 'antd'
import { ReactNode } from 'react'
import { colors, fonts } from './constants'
import 'antd/dist/reset.css'

interface IConfigProvider {
  children?: ReactNode
}

const ConfigProviderAntd = ({ children }: IConfigProvider) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: colors.primary,
        fontFamily: fonts.primary,
        colorTextBase: colors.fontColor,
      },
      components: {
        Table: {
          colorBgContainer: 'transparent',
          fontSize: 15,
          colorFillAlter: 'transparent',
          colorBorderSecondary: 'black',
          lineWidth: 1,
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default ConfigProviderAntd
