import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address } from "@graphprotocol/graph-ts"
import { CandidateAccepted } from "../generated/schema"
import { CandidateAccepted as CandidateAcceptedEvent } from "../generated/W3HF/W3HF"
import { handleCandidateAccepted } from "../src/w-3-hf"
import { createCandidateAcceptedEvent } from "./w-3-hf-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let candidateId = Bytes.fromI32(1234567890)
    let newCandidateAcceptedEvent = createCandidateAcceptedEvent(candidateId)
    handleCandidateAccepted(newCandidateAcceptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CandidateAccepted created and stored", () => {
    assert.entityCount("CandidateAccepted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CandidateAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "candidateId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
