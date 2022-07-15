require(`dotenv`).config()

const { CONN_STRING } = process.env

interface ConfifurationProps {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

interface ConnectionProps {
  conn_string?: string
  configurations:ConfifurationProps
}

const MONGO_CONFIG: ConfifurationProps = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export const config: ConnectionProps = {
  conn_string: CONN_STRING,
  configurations: MONGO_CONFIG
}

