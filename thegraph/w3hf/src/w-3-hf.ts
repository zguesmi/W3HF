import {
  CandidateAccepted as CandidateAcceptedEvent,
  CandidateNominated as CandidateNominatedEvent,
  VotedForCandidate as VotedForCandidateEvent
} from "../generated/W3HF/W3HF"
import {
  CandidateAccepted,
  CandidateNominated,
  VotedForCandidate
} from "../generated/schema"

export function handleCandidateAccepted(event: CandidateAcceptedEvent): void {
  let entity = new CandidateAccepted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.candidateId = event.params.candidateId
  entity.save()
}

export function handleCandidateNominated(event: CandidateNominatedEvent): void {
  let entity = new CandidateNominated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.candidateId = event.params.candidateId
  entity.twitterId = event.params.twitterId
  entity.ipfsCid = event.params.ipfsCid
  entity.save()
}

export function handleVotedForCandidate(event: VotedForCandidateEvent): void {
  let entity = new VotedForCandidate(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.candidateId = event.params.candidateId
  entity.voter = event.params.voter
  entity.save()
}
