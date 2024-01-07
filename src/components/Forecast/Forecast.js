import React from 'react'
import Chart from 'chart.js/auto'
import { useEffect } from 'react'

function Forecast({ placeInfo }) {
  useEffect(() => {
    const extractForecast = async () => {
      const obj = await fetchForecast(placeInfo.lat, placeInfo.lng)
      console.log(obj)
      // 日ごとに分ける
      const dayObj = {}
      for (let i = 0; i < obj['hourly']['time'].length; i++) {
        const date = new Date(obj['hourly']['time'][i])
        date.setHours(date.getHours() + 9)
        const hour = date.getHours()
        const day = date.getDate()
        if (dayObj[day] === undefined) {
          dayObj[day] = {
            'hour': [],
            'msm': [],
            'gsm': [],
            'ecmwf': [],
            'gfs' : [],
            'icon': [],
            'gem': [],
          }
        }
        dayObj[day]["msm"].push(obj['hourly']['temperature_2m_jma_msm'][i])
        dayObj[day]["gsm"].push(obj['hourly']['temperature_2m_jma_gsm'][i])
        dayObj[day]["ecmwf"].push(obj['hourly']['temperature_2m_ecmwf_ifs04'][i])
        dayObj[day]["gfs"].push(obj['hourly']['temperature_2m_gfs_global'][i])
        dayObj[day]["icon"].push(obj['hourly']['temperature_2m_icon_global'][i])
        dayObj[day]["gem"].push(obj['hourly']['temperature_2m_gem_global'][i])
        dayObj[day]["hour"].push(hour)
      }
      console.log(dayObj)
      // グラフを描画
      for (let day in dayObj) {
        drawGraph(dayObj, day)
      }
    }
    extractForecast()
  }, [])
  return (
    <div
      className='
        w-screen h-full
        flex items-center justify-center
        bg-black
        text-white text-2xlnp
      '
    >
      <div
        className='
          w-9/12 h-full
          flex flex-col items-center
        '
        id = 'canvasContainer'
      >
      </div>
    </div>
  )
}


const fetchForecast = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&wind_speed_unit=ms&models=ecmwf_ifs04,gfs_global,jma_msm,jma_gsm,icon_global,gem_global`
  const obj = await fetch(url)
    .then(res => res.json())
  return obj
}

const drawGraph = (dayObj, day) => {
  const obj = dayObj[day]
  const canvasContainer = document.getElementById('canvasContainer')
  // canvasWrapperを作成
  const canvasWrapper = document.createElement('div')
  canvasWrapper.className = 'w-full h-96'
  canvasWrapper.id = `canvasWrapper${day}`
  canvasContainer.appendChild(canvasWrapper)
  // canvasを作成
  const canvas = document.createElement('canvas')
  canvas.className = 'w-full h-full'
  canvas.id = `canvas${day}`
  canvasWrapper.appendChild(canvas)
  // グラフを描画
  const ctx = document.getElementById(`canvas${day}`).getContext('2d')

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: obj['hour'],
      datasets: [
        {
          label: 'MSM',
          data: obj['msm'],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        },
        {
          label: 'GSM',
          data: obj['gsm'],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)'
        },
        {
          label: 'ECMWF',
          data: obj['ecmwf'],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        },
        {
          label: 'GFS',
          data: obj['gfs'],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        },
        {
          label: 'ICON',
          data: obj['icon'],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)'
        },
        {
          label: 'GEM',
          data: obj['gem'],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)'
        }
      ]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function(value, index, values) {
              return value + '℃'
            },
            color: '#ffffff',
          },
          grid: {
            color: '#ffffff',
          }
        },
        x: {
          ticks: {
            callback: function(value, index, values) {
              if (value % 3 === 0) {
                return value + '時'
              }
            },
            color: '#ffffff',
          },
          grid: {
            color: '#ffffff',
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: `${day}日`,
          color: '#ffffff',
          font: {
            size: 24,
          }
        },
        legend: {
          labels: {
            color: '#ffffff',
          }
        }
      }
    }
  })
}

export default Forecast