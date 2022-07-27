const supertest = require('supertest');
const request = supertest('http://127.0.0.1:5001/test-work-e2226/us-central1')
const { checkNFTAuthenticity } = require("./index");

describe('NFT tokens', () => {
  it("this NFT should be fake", async () => {
    const response = await request.get('/checkNFTAuthenticity?nft=8JWyCQzB3FBXMiZBdLd1L6nYneNaowwffC4DQWd4YEGk');
    expect(response.status).toBe(200);
    expect(response.body.real).toBe(false);
  });

  it("this NFT should be real", async () => {
    const response = await request.get('/checkNFTAuthenticity?nft=5sYajCWGHeM6Ru8FXCU6zhodQ2B9oyYiRJiqxGdYfZoo');
    expect(response.status).toBe(200);
    expect(response.body.real).toBe(true);
  });
})
