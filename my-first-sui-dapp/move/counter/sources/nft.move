module 0x0::nft {

    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// NFT structure
    struct NFT has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        owner: address,
    }

    /// Mint a new NFT
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = NFT {
            id: object::new(ctx),
            name,
            description,
            url,
            owner: tx_context::sender(ctx),
        };
        transfer::transfer(nft, tx_context::sender(ctx));
    }
}
