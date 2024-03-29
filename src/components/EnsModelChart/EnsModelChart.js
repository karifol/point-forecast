import React from 'react'
import Chart from 'chart.js/auto'
import { useEffect } from 'react'


function EnsModelChart({ placeInfo, date, setDate, data, setData, dateArray, setDateArray}) {
  useEffect(() => {
    const extractForecast = async () => {
      const obj = await fetchForecast(placeInfo.lat, placeInfo.lng)
      // 日ごとに分ける
      const dayObj = {}
      console.log(obj)
      for (let i = 0; i < obj['hourly']['time'].length; i++) {
        const date = new Date(obj['hourly']['time'][i])
        date.setHours(date.getHours() + 9)
        const hour = date.getHours()
        const day = date.getDate()
        const dayStr = `${date.getMonth() + 1}/${day}`
        if (dayObj[dayStr] === undefined) {
          dayObj[dayStr] = {
            'hour': [],
            'icon': {},
            'ecmwf': {},
            'gfs' : {},
            'gem': {},
            'bom': {},
          }
        }
        dayObj[dayStr]["msm"].push(obj['hourly']['temperature_2m_jma_msm'][i])
        dayObj[dayStr]["gsm"].push(obj['hourly']['temperature_2m_jma_gsm'][i])
        dayObj[dayStr]["ecmwf"].push(obj['hourly']['temperature_2m_ecmwf_ifs04'][i])
        dayObj[dayStr]["gfs"].push(obj['hourly']['temperature_2m_gfs_global'][i])
        dayObj[dayStr]["icon"].push(obj['hourly']['temperature_2m_icon_global'][i])
        dayObj[dayStr]["gem"].push(obj['hourly']['temperature_2m_gem_global'][i])
        dayObj[dayStr]["hour"].push(hour)
      }
      setData(dayObj)
      setDateArray(Object.keys(dayObj))
      // グラフを描画
      for (let day in dayObj) {
        drawGraph(dayObj, day)
        break
      }
    }
    extractForecast()
  }, [])

  useEffect(() => {
    const canvasContainer = document.getElementById('canvasContainer')
    canvasContainer.innerHTML = ''
    if (date === '') return
    drawGraph(data, date)
  }, [date])

  return (
    <div
      className='
        w-9/12
        flex flex-col items-center
        m-0 p-0
      '
      id = 'ensCanvasContainer'
    >
    </div>
  )
}

const fetchForecast = async (lat, lng) => {
  const url = `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&wind_speed_unit=ms&models=icon_global,gfs025,ecmwf_ifs04,gem_global,bom_access_global_ensemble`
  const obj = await fetch(url)
    .then(res => res.json())
  return obj
}

const drawGraph = (dayObj, day) => {
  const obj = dayObj[day]
  const canvasContainer = document.getElementById('ensCanvasContainer')
  // canvasWrapperを作成
  const canvasWrapper = document.createElement('div')
  canvasWrapper.className = 'w-full h-96 flex items-center justify-center'
  canvasWrapper.id = `canvasWrapper${day}`
  canvasContainer.appendChild(canvasWrapper)
  // canvasを作成
  const canvas = document.createElement('canvas')
  canvas.className = 'w-full h-full'
  canvas.id = `ensCanvas${day}`
  canvasWrapper.appendChild(canvas)
  // グラフを描画
  const ctx = document.getElementById(`ensCanvas${day}`).getContext('2d')

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
        legend: {
          labels: {
            color: '#ffffff',
          }
        }
      }
    }
  })
}

export default EnsModelChart