import * as React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

interface SpotlightProps {
    imageSrc: string
    spotlightSize: number
    spotlightIntensity: number
    shineIntensity: number
    shineColor: string
}

export default function Spotlight({
    imageSrc,
    spotlightSize,
    spotlightIntensity,
    shineIntensity,
    shineColor,
    ...props
}: SpotlightProps) {
    const [isRevealed, setIsRevealed] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [spotlightPosition, setSpotlightPosition] = React.useState({
        x: "50%",
        y: "50%",
    })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isRevealed) {
            setIsHovered(true)
            const rect = (e.target as HTMLDivElement).getBoundingClientRect()
            setSpotlightPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleClick = () => {
        setIsRevealed(true)
    }

    const imageAnimate = isRevealed
        ? { filter: "blur(0px)", scale: 1.05 }
        : isHovered
          ? { filter: "blur(0px)" }
          : { filter: `blur(${spotlightIntensity}px)` }

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                ...props.style,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <motion.img
                src={imageSrc}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                animate={imageAnimate}
                transition={{ duration: 0.5 }}
            />
            {!isRevealed && (
                <>
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `radial-gradient(circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, ${shineColor}, transparent ${spotlightSize}px)`,
                            mixBlendMode: "lighten",
                        }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `radial-gradient(circle ${spotlightSize}px at ${spotlightPosition.x}px ${spotlightPosition.y}px, transparent, black)`,
                            mixBlendMode: "darken",
                        }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </>
            )}
        </div>
    )
}

Spotlight.defaultProps = {
    imageSrc: "https://source.unsplash.com/random",
    spotlightSize: 150,
    spotlightIntensity: 10,
    shineIntensity: 0.8,
    shineColor: "rgba(255, 255, 255, 0.8)",
}

addPropertyControls(Spotlight, {
    imageSrc: {
        type: ControlType.Image,
        title: "Image Source",
    },
    spotlightSize: {
        type: ControlType.Number,
        title: "Spotlight Size",
        min: 50,
        max: 300,
        unit: "px",
    },
    spotlightIntensity: {
        type: ControlType.Number,
        title: "Spotlight Intensity",
        min: 0,
        max: 20,
    },
    shineIntensity: {
        type: ControlType.Number,
        title: "Shine Intensity",
        min: 0,
        max: 1,
        step: 0.1,
    },
    shineColor: {
        type: ControlType.Color,
        title: "Shine Color",
    },
})
