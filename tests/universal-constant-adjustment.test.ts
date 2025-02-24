import { describe, it, beforeEach, expect } from "vitest"

describe("Universal Constant Adjustment Contract", () => {
  let mockStorage: Map<string, any>
  
  beforeEach(() => {
    mockStorage = new Map()
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "adjust-constant":
        const [name, value] = args
        mockStorage.set(name, value)
        return { success: true }
      case "get-constant":
        const [getName] = args
        return { success: true, value: { value: mockStorage.get(getName) || 0 } }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should adjust a constant", () => {
    const result = mockContractCall("adjust-constant", ["speed-of-light", 299792458])
    expect(result.success).toBe(true)
  })
  
  it("should get a constant value", () => {
    mockContractCall("adjust-constant", ["speed-of-light", 299792458])
    const result = mockContractCall("get-constant", ["speed-of-light"])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({ value: 299792458 })
  })
  
  it("should return default value for non-existent constant", () => {
    const result = mockContractCall("get-constant", ["unknown-constant"])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({ value: 0 })
  })
})

