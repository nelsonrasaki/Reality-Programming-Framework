import { describe, it, beforeEach, expect } from "vitest"

describe("Probability Manipulation Contract", () => {
  let mockStorage: Map<string, any>
  
  beforeEach(() => {
    mockStorage = new Map()
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "set-probability":
        const [event, probability] = args
        mockStorage.set(event, probability)
        return { success: true }
      case "get-probability":
        const [getEvent] = args
        return { success: true, value: { probability: mockStorage.get(getEvent) || 50 } }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should set a probability", () => {
    const result = mockContractCall("set-probability", ["coin-flip-heads", 60])
    expect(result.success).toBe(true)
  })
  
  it("should get a probability", () => {
    mockContractCall("set-probability", ["coin-flip-heads", 60])
    const result = mockContractCall("get-probability", ["coin-flip-heads"])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({ probability: 60 })
  })
  
  it("should return default probability for non-existent event", () => {
    const result = mockContractCall("get-probability", ["unknown-event"])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({ probability: 50 })
  })
})

