'use strict'
const $ = document.querySelector.bind(document)
const $s = document.querySelectorAll.bind(document)

const heading = $('header h2')
const playlist =  $('.playlist')
const  cdThumb = $('.cd-thumb')
const cd = $('.cd')
const audio = $('#audio')
const repeatBtn = $('.btn-repeat')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const playBtn = $('.btn-toggle-play')
const randomBtn = $('.btn-random')
const player = $('.player')
const progress = $('#progress')
const volume = $('#volume')
 volume.value = 100

const app = {
    currentIndex : 0 ,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs : [
        {
        name: "Bầu Trời Đầy Sao Không Bằng Anh",
        singer: "YCCC",
        path: "./asset/music/Bầu Trời Đầy Sao Không Bằng Anh - 满天星辰不及你.mp3",
        image: "https://i.ytimg.com/vi/96tgdM1S35E/maxresdefault.jpg"
        },
        {
        name: "Có người",
        singer: "Vũ Cát Tường",
        path: "./asset/music/Có Người.mp3",
        image: "https://cdn-www.vinid.net/a8bc51a4-cac-ca-khuc-diem-nhan-cua-vu-cat-tuong.jpg"
        },
        {
        name: "Hành Tinh Ánh Sáng",
        singer: "Vũ Cát Tường",
        path: "./asset/music/Hành Tinh Ánh Sáng.mp3",
        image:
            "https://i.ytimg.com/vi/tN4h9ZpM2-Q/maxresdefault.jpg"
        },
        {
        name: "Nước Mắt Thiếu Niên",
        singer: "Raftaar x Brobha V",
        path:
            "./asset/music/NuocMatThieuNienDauPhaThuongKhungOST-VA-6984885.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
        name: "Phá Kén",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "./asset/music/PhaKen-TruongThieuHamAngelaChang-6285611.mp3",
        image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
        name: "Sau Biệt Ly",
        singer: "Raftaar",
        path: "./asset/music/Sau Biệt Ly (Đấu Phá Thương Khung OST).mp3",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
        name: "Tương Tư Thành Họa",
        singer: "Raftaar x kr$na",
        path:
            "./asset/music/Tương Tư Thành Họa - 相思成灾.mp3",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
        name: "Tay Trái Chỉ Trăng",
        singer: "Raftaar x Harjas",
        path: "./asset/music/Tay Trái Chỉ Trăng - 左手指月.mp3",
        image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Vi-Toi-Con-Song",
            singer: "Raftaar x Harjas",
            path: "./asset/music/Vi-Toi-Con-Song-Tien-Tien.mp3",
            image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Vì Mẹ Anh Bắt Chia Tay",
            singer: "Raftaar x Harjas",
            path: "./asset/music/Vì Mẹ Anh Bắt Chia Tay.mp3",
            image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Vết Mưa",
            singer: "Raftaar x Harjas",
            path: "./asset/music/Vết Mưa (Unplugged).mp3",
            image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "nhạc sóng alpha",
            singer: "No Name",
            path: "./asset/music/Nhạc Sóng Não Alpha.mp3",
            image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    render: function() {
        const html = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
          `
        })
        playlist.innerHTML = html.join('')

    },
    defineProperties : function() {
        Object.defineProperty(this, 'currentSong' , {
            get : function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        //scroll top     
        const _this = this  
        const cdWidth = cd.offsetWidth

       const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
            ],
            { 
            duration: 30000,
            interations: Infinity
            }
            )
        cdThumbAnimate.pause()

        document.onscroll = function() {
            const scrollTop =  window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth>0? newCdWidth + 'px' : 0            
        }
         //play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()                
            } else {
                audio.play()   
            }

            
        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
            
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }
        audio.ontimeupdate = function() {
            const progressPercent = audio.currentTime / audio.duration *100
            progress.value = progressPercent
        }
        // tua song
        progress.onchange = function(e) {
           const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        // change volume
        volume.onchange= function(e) {
            volume.value = e.target.value
            const currentVolume = e.target.value/100
            audio.volume = currentVolume
        }
        // next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
                audio.play()
                _this.render()
            } else{
                _this.nextSong()
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
        }
        //prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
                audio.play()
                _this.render()
            } else{
                _this.prevSong()
                audio.play()
                _this.render()
                _this.scrollToActiveSong()

            }
        }
        //random song
        randomBtn.onclick= function() {
           _this.isRandom = !_this.isRandom
           randomBtn.classList.toggle('active', _this.isRandom)
        }
        //repeat song
        repeatBtn.onclick= function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
         }
        // khi end  song
        audio.onended = function() {
            if(_this.isRepeat) {
                _this.repeatSong()
            } else {
                nextBtn.click()
            }
        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
            }
        }
    },
    repeatSong: function() {
        audio.play()
    },
    nextSong: function() {
        const _this = this
        _this.currentIndex++
        if(_this.currentIndex>= _this.songs.length) {
            _this.currentIndex = 0
        } 
        _this.loadCurrentSong()
    },
    prevSong: function() {
        const _this = this
        _this.currentIndex--
        if(_this.currentIndex<0) {
            _this.currentIndex = _this.songs.length-1 
        }
        _this.loadCurrentSong()
    },
    randomSong : function() {
        const _this= this
        let newIndex 
        do{
            newIndex = Math.floor(Math.random()*(_this.songs.length))
        } while(newIndex==this.currentIndex)
        this.currentIndex = newIndex
        _this.loadCurrentSong()
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    scrollToActiveSong: function() {
        $('.song.active').scrollIntoView({
            behavior : 'smooth',
            block: 'nearest'
        })
    },
    start: function() {
        this.defineProperties()
        this.loadCurrentSong()
        this.handleEvent()
        this.render()
    }

    
}
app.start()
