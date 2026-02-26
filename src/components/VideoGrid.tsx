import { useState, useEffect, useCallback } from 'react'
import './VideoGrid.css'

// Import all video files
import video1 from '../assets/video/13587928_2160_3840_30fps.mp4'
import video2 from '../assets/video/13587934_2160_3840_30fps.mp4'
import video3 from '../assets/video/14498693_2160_3840_25fps.mp4'
import video4 from '../assets/video/2796087-hd_1080_1920_25fps.mp4'
import video5 from '../assets/video/3188989-hd_1080_1920_25fps.mp4'
import video6 from '../assets/video/3298699-uhd_2160_4096_25fps.mp4'
import video7 from '../assets/video/4253143-uhd_2160_4096_25fps.mp4'
import video8 from '../assets/video/4434136-uhd_2160_3840_30fps.mp4'
import video9 from '../assets/video/4434138-hd_1080_1920_30fps.mp4'
import video10 from '../assets/video/4434140-hd_1080_1920_30fps.mp4'
import video11 from '../assets/video/4434148-hd_1080_1920_30fps.mp4'
import video12 from '../assets/video/4434150-hd_1080_1920_30fps.mp4'
import video13 from '../assets/video/4434157-hd_720_1280_30fps.mp4'
import video14 from '../assets/video/4434159-hd_1080_1920_30fps.mp4'
import video15 from '../assets/video/4434162-hd_1080_1920_30fps.mp4'
import video16 from '../assets/video/4434208-hd_720_1280_30fps.mp4'
import video17 from '../assets/video/4434209-hd_1080_1920_30fps.mp4'
import video18 from '../assets/video/4434210-uhd_2160_3840_24fps.mp4'
import video19 from '../assets/video/4434242-uhd_2160_3840_24fps.mp4'
import video20 from '../assets/video/4612183-uhd_2160_4096_25fps.mp4'
import video21 from '../assets/video/4723054-hd_1080_1920_25fps.mp4'
import video23 from '../assets/video/5120413-hd_1080_1920_25fps.mp4'
import video24 from '../assets/video/5198956-uhd_2160_4096_25fps.mp4'
import video25 from '../assets/video/5372761-hd_720_1280_30fps.mp4'
import video26 from '../assets/video/5501730-uhd_2160_3840_24fps.mp4'
import video27 from '../assets/video/5667123-uhd_2160_4096_30fps.mp4'
import video28 from '../assets/video/5744686-uhd_2160_3840_24fps.mp4'
import video29 from '../assets/video/5927657-hd_1080_1920_30fps.mp4'
import video30 from '../assets/video/6003997-uhd_2160_3840_30fps.mp4'
import video31 from '../assets/video/6395999-hd_1080_1920_25fps.mp4'
import video32 from '../assets/video/7015436-hd_1080_1920_25fps.mp4'
import video33 from '../assets/video/7197660-uhd_2160_3840_25fps.mp4'
import video34 from '../assets/video/7197663-uhd_2160_3840_25fps.mp4'
import video35 from '../assets/video/7406583-hd_1080_1920_25fps.mp4'
import video36 from '../assets/video/7425557-uhd_2160_3840_30fps.mp4'
import video37 from '../assets/video/7525614-hd_1066_1920_25fps.mp4'
import video38 from '../assets/video/7800162-uhd_2160_3840_25fps.mp4'
import video39 from '../assets/video/8049828-hd_1080_1920_24fps.mp4'
import video40 from '../assets/video/8049830-hd_1080_1920_24fps.mp4'
import video41 from '../assets/video/8473394-hd_1080_1920_25fps.mp4'
import video42 from '../assets/video/8691736-uhd_2160_4096_24fps.mp4'
import video43 from '../assets/video/8838157-hd_1080_1920_24fps.mp4'
import video44 from '../assets/video/9484987-uhd_2160_3840_25fps.mp4'

const allVideos = [
  video1, video2, video3, video4, video5, video6, video7, video8, video9, video10,
  video11, video12, video13, video14, video15, video16, video17, video18, video19, video20,
  video21, video23, video24, video25, video26, video27, video28, video29, video30,
  video31, video32, video33, video34, video35, video36, video37, video38, video39, video40,
  video41, video42, video43, video44
]

const GRID_COUNT = 24

interface VideoGridProps {}

const VideoGrid: React.FC<VideoGridProps> = () => {
  const [gridVideos, setGridVideos] = useState<string[]>([])
  const [usedVideos, setUsedVideos] = useState<Set<number>>(new Set())

  // Initialize videos for all grids
  useEffect(() => {
    const initialVideos: string[] = []
    const initialUsed = new Set<number>()
    
    // Randomly assign videos to each grid, ensuring no duplicates
    for (let i = 0; i < GRID_COUNT; i++) {
      let randomIndex: number
      do {
        randomIndex = Math.floor(Math.random() * allVideos.length)
      } while (initialUsed.has(randomIndex))
      
      initialVideos.push(allVideos[randomIndex])
      initialUsed.add(randomIndex)
    }
    
    console.log('Initial video indices used:', Array.from(initialUsed).sort())
    console.log('Total videos available:', allVideos.length)
    setGridVideos(initialVideos)
    setUsedVideos(initialUsed)
  }, [])

  // Get a new random video that's not currently being used
  const getNewRandomVideo = useCallback(() => {
    const availableVideos = allVideos.filter((_, index) => !usedVideos.has(index))
    
    if (availableVideos.length === 0) {
      // If all videos are used, reset and start fresh
      const randomIndex = Math.floor(Math.random() * allVideos.length)
      return { video: allVideos[randomIndex], index: randomIndex }
    }
    
    const randomIndex = Math.floor(Math.random() * availableVideos.length)
    const selectedVideo = availableVideos[randomIndex]
    const originalIndex = allVideos.indexOf(selectedVideo)
    
    return { video: selectedVideo, index: originalIndex }
  }, [usedVideos])

  // Handle video end event for a specific grid
  const handleVideoEnd = useCallback((gridIndex: number) => {
    setGridVideos(prevVideos => {
      const newVideos = [...prevVideos]
      const { video: newVideo, index: newIndex } = getNewRandomVideo()
      
      // Remove the old video from used set and add the new one
      setUsedVideos(prevUsed => {
        const newUsed = new Set(prevUsed)
        // Find and remove the old video index
        const oldVideoIndex = allVideos.indexOf(prevVideos[gridIndex])
        if (oldVideoIndex !== -1) {
          newUsed.delete(oldVideoIndex)
        }
        newUsed.add(newIndex)
        return newUsed
      })
      
      newVideos[gridIndex] = newVideo
      return newVideos
    })
  }, [getNewRandomVideo])

  return (
    <div className="video-grid">
      {gridVideos.map((videoSrc, index) => (
        <div key={`grid-${index}`} className="video-grid-item">
          <video
            key={`video-${index}-${videoSrc}`} // Force re-render when video changes
            className="grid-video"
            src={videoSrc}
            autoPlay
            muted
            loop={false}
            playsInline
            onEnded={() => handleVideoEnd(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default VideoGrid
