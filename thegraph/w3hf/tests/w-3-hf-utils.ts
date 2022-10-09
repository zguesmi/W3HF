import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  CandidateAccepted,
  CandidateNominated,
  VotedForCandidate
} from "../generated/W3HF/W3HF"

export function createCandidateAcceptedEvent(
  candidateId: Bytes
): CandidateAccepted {
  let candidateAcceptedEvent = changetype<CandidateAccepted>(newMockEvent())

  candidateAcceptedEvent.parameters = new Array()

  candidateAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromFixedBytes(candidateId)
    )
  )

  return candidateAcceptedEvent
}

export function createCandidateNominatedEvent(
  candidateId: Bytes,
  twitterId: string,
  ipfsCid: Bytes
): CandidateNominated {
  let candidateNominatedEvent = changetype<CandidateNominated>(newMockEvent())

  candidateNominatedEvent.parameters = new Array()

  candidateNominatedEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromFixedBytes(candidateId)
    )
  )
  candidateNominatedEvent.parameters.push(
    new ethereum.EventParam("twitterId", ethereum.Value.fromString(twitterId))
  )
  candidateNominatedEvent.parameters.push(
    new ethereum.EventParam("ipfsCid", ethereum.Value.fromBytes(ipfsCid))
  )

  return candidateNominatedEvent
}

export function createVotedForCandidateEvent(
  candidateId: Bytes,
  voter: Address
): VotedForCandidate {
  let votedForCandidateEvent = changetype<VotedForCandidate>(newMockEvent())

  votedForCandidateEvent.parameters = new Array()

  votedForCandidateEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromFixedBytes(candidateId)
    )
  )
  votedForCandidateEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return votedForCandidateEvent
}
