const functions = require("firebase-functions");
const solana = require("@solana/web3.js");
const { programs } = require('@metaplex/js');

const connection = new solana.Connection(solana.clusterApiUrl('mainnet-beta'));

exports.checkNFTAuthenticity = functions.https.onRequest(async (req, res) => {
  const start = new Date().getTime();
  const nft = req.query.nft;

  try {
    const mintPubkey = new solana.PublicKey(nft);
    const tokenmetaPubkey = await programs.metadata.Metadata.getPDA(mintPubkey);

    const tokenMeta = await programs.metadata.Metadata.load(connection, tokenmetaPubkey);
    let verified = false;
    const creators = [...tokenMeta.data.data.creators];

    for (let i = 0; i < creators.length; i++) {
      if (creators[i].verified) {
        verified = true;
        break;
      }
    }

    const end = new Date().getTime() - start;
    res.status(200).json({
      real: verified,
      totalTime: end,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});