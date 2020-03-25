import Plugin from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'

const {Events, POSITIONS, Sniffer} = Plugin

class Play extends Plugin {
  static get pluginName () {
    return 'Play'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 0,
      disable: false
    }
  }

  afterCreate () {
    const { player, config } = this
    if (config.disable) {
      return
    }
    this.initIcons()
    this.btnClick = this.btnClick.bind(this)
    const event = Sniffer.device === 'mobile' ? 'touchend' : 'click'
    this.bind(event, this.btnClick)

    this.on(Events.PAUSE, () => {
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.animate(player.paused)
    })
  }

  // 扩展语言
  registerLangauageTexts () {
    return {
      'play': {
        jp: 'play',
        en: 'play',
        zh: '播放'
      },
      'pause': {
        jp: 'pause',
        en: 'pause',
        zh: '暂停'
      }
    }
  }

  registerIcons () {
    return {
      play: {icon: PlaySvg, class: 'xg-icon-play'},
      pause: {icon: PauseSvg, class: 'xg-icon-pause'}
    }
  }

  btnClick (e) {
    const {player} = this
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.xgplayer-icon', icons.play)
    this.appendChild('.xgplayer-icon', icons.pause)
  }

  animate (paused) {
    if (paused) {
      this.setAttr('data-state', 'pause')
      this.find('.xg-tips').innerHTML = this.text.play
    } else {
      this.setAttr('data-state', 'play')
      this.find('.xg-tips').innerHTML = this.text.pause
    }
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.btnClick)
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    </div>
    <div class="xg-tips">${this.player.paused ? this.text.play : this.text.pause}</div>
    </xg-icon>`
  }
}
export default Play
