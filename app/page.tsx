import styles from "./page.module.css"
import Menu from "./components/menu"

export default function Home() {
  return (
    <main className={styles.main}>
      <Menu />
    </main>
  )
}
