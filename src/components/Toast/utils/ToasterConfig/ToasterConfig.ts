/**
 * ToasterConfig
 * ------------------------------------------------
 * DESCRIPTION_HERE
 */

import { Position } from "../../types"

export interface Config {
  duration: number
  animationDuration: number
  position: Position
  behavior: "stack" | "replace"
}

export class ToasterConfig {
  private duration: Config["duration"]
  private animationDuration: Config["animationDuration"]
  private position: Config["position"]
  private behavior: Config["behavior"]
  constructor(config: Partial<Config> = {}) {
    this.duration = config.duration || 5000
    this.animationDuration = config.animationDuration || 300
    this.position = config.position || {
      vertical: "bottom",
      horizontal: "center",
    }
    this.behavior = config.behavior || "stack"
  }

  getConfig() {
    return {
      duration: this.duration,
      animationDuration: this.animationDuration,
      position: this.position,
      behavior: this.behavior,
    }
  }
}
