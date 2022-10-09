import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("W3HF", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploySampleFixture() {
        const acceptanceThreshold = 1000; // Chosen randomly for now.
        // Contracts are deployed using the first signer/account by default
        const [defaultAccount, account1] = await ethers.getSigners();
        const W3HF = await ethers.getContractFactory("W3HF");
        const w3hf = await W3HF.deploy(acceptanceThreshold);
        return { w3hf, acceptanceThreshold, defaultAccount, account1 };
    }

    describe("Deployment", function () {
        it("Should set the right acceptance threshold", async function () {
            const { w3hf, acceptanceThreshold } = await loadFixture(deploySampleFixture);

            expect(await w3hf.acceptanceThreshold()).to.equal(acceptanceThreshold);
        });
    });

    describe("Nomination", function () {
        it("Should nominate candidate", async function () {
            const { w3hf } = await loadFixture(deploySampleFixture);
            const twitterId = "someId";
            const ipfsCid = ethers.utils.toUtf8Bytes("QmRBkKi1PnthqaBaiZnXML6fH6PNqCFdpcBxGYXoUQfp6z");
            const expectedCandidateId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(twitterId));

            await expect(w3hf.nominateCandidate(twitterId, ipfsCid))
                    .to.emit(w3hf, "CandidateNominated")
                    .withArgs(expectedCandidateId, twitterId, ipfsCid);
        });
        it("Should not nominate candidate twice", async function () {
            const { w3hf } = await loadFixture(deploySampleFixture);
            const twitterId = "someId";
            const ipfsCid = ethers.utils.toUtf8Bytes("QmRBkKi1PnthqaBaiZnXML6fH6PNqCFdpcBxGYXoUQfp6z");
            
            await w3hf.nominateCandidate(twitterId, ipfsCid); // First time should succeed.
            
            await expect(w3hf.nominateCandidate(twitterId, ipfsCid))
                    .to.be.revertedWith("Candidate exists already.");
        });
    });

    describe("Voting", function () {
        it("Should vote for candidate", async function () {
            const { w3hf, acceptanceThreshold, defaultAccount } = await loadFixture(deploySampleFixture);
            const twitterId = "someId";
            const ipfsCid = ethers.utils.toUtf8Bytes("QmRBkKi1PnthqaBaiZnXML6fH6PNqCFdpcBxGYXoUQfp6z");
            const candidateId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(twitterId));
            
            await w3hf.nominateCandidate(twitterId, ipfsCid);

            await expect(w3hf.voteForCandidate(candidateId))
                    .to.emit(w3hf, "VotedForCandidate")
                    .withArgs(candidateId, defaultAccount.address);
        });
        it("Should not vote for non existent candidate", async function () {
            const { w3hf } = await loadFixture(deploySampleFixture);
            const twitterId = "someId";
            const candidateId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(twitterId));

            // Don't nominate candidate
                        
            await expect(w3hf.voteForCandidate(candidateId))
                    .to.be.revertedWith("Candidate does not exist.");
        });
        it("Should not vote for candidate twice", async function () {
            const { w3hf, acceptanceThreshold, defaultAccount } = await loadFixture(deploySampleFixture);
            const twitterId = "someId";
            const ipfsCid = ethers.utils.toUtf8Bytes("QmRBkKi1PnthqaBaiZnXML6fH6PNqCFdpcBxGYXoUQfp6z");
            const candidateId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(twitterId));
            
            await w3hf.nominateCandidate(twitterId, ipfsCid);

            await w3hf.voteForCandidate(candidateId)

            await expect(w3hf.voteForCandidate(candidateId))
                    .to.be.revertedWith("Already voted for candidate");
        });
    });
});
