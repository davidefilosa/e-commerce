'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import classes from './index.module.scss'

export const Promotion = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const today = new Date()
  let targetDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <motion.h3
          className={classes.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 1 }}
        >
          Deals of the Month
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 1.25 }}
        >
          Prepare for an unprecedented shopping journey with our Deals of the Month! Each purchase
          unlocks exclusive perks and irresistible offers, turning this month into a celebration of
          smart decisions and incredible savings. Don't let these amazing deals slip away!
        </motion.p>

        <ul className={classes.stats} ref={ref}>
          <StatBox label="Days" value={time.days} isInView={isInView} index={0} />
          <StatBox label="Hours" value={time.hours} isInView={isInView} index={1} />
          <StatBox label="Minutes" value={time.minutes} isInView={isInView} index={2} />
          <StatBox label="Seconds" value={time.seconds} isInView={isInView} index={3} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({
  label,
  value,
  isInView,
  index,
}: {
  label: string
  value: number
  isInView: boolean
  index: number
}) => (
  <motion.li
    className={classes.statBox}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
    transition={{ duration: 1, delay: 0.5 * index }}
  >
    <h4>{value}</h4>
    <p>{label}</p>
  </motion.li>
)
