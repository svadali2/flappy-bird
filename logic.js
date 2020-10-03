document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const container = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const sky = document.querySelector('.sky')

    let birdLeft = 220
    let birdBottom = 100

    let isGameOver = false

    let gap = 430

    let gravity = 2

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let start = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }


    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500     
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        container.appendChild(obstacle)
        container.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px' 
            topObstacle.style.left = obstacleLeft + 'px'
            if (obstacleLeft === -60) {
                clearInterval(obstacleMover)
                container.removeChild(obstacle)
                container.removeChild(topObstacle)
            }
            if (obstacleLeft > 200 && 
                obstacleLeft < 280 && 
                birdLeft === 220 &&
                (birdBottom < obstacleBottom + 149 || 
                    birdBottom > obstacleBottom + gap - 205) || 
                birdBottom === 0) {
                gameOver()
                clearInterval(obstacleMover)
            }
        }
    
        let obstacleMover = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }

    generateObstacle()

    function gameOver() {
            clearInterval(start)
            isGameOver = true
            document.removeEventListener('keyup', control)
    }
})