# GO Podcast

GO Podcast is your gateway to a world of audio entertainment, empowering you to discover, personalize, and control your listening experience like never before.

## Installation

1. [Setup Sentry](https://sentry.io/)

2. [Setup firebase](https://firebase.google.com/docs/web/setup)

3. Copy `.env.example` to `.env`

4. Add values to each key in `.env` file based on step 1 and step 2

5. Run `npm install` and `npm run`

Note: If you have firestore error in the console, you'll have to create firestore database index by the link it provides you in the error.

## Seed

To run seed, find the comment "// Comment three imports below to run seed", comment three imports and run `npm run seed`

Note: Currently, I haven't find a good way to mock or conditionally import files so this is a temporary way

## Architecture Diagram

![Podcast Architecture](https://github.com/nicktruong/podcast/assets/154394020/f6f6991d-f4f6-4860-bd26-4b05361e4e50)

## DB Diagram

[![](https://mermaid.ink/img/pako:eNqlVttu2zAM_RVDQN_SILcaqd-KdQMCDCuwri9bhkKxmFioLBmS3C1N8u-jb7Fj2UvW5SW2SB1Sh4eUdyRUDEhAQN9zutE0XkoPf6kBbbxd8ZL9jNVcbrwVV-21Hz-9kFrYKM3BPKwX0oIGY2s3hlYv1IB_7M46kBBTLupVmcYr0B4k3GBm5oNKpe0IuVZCqF_47OBtQDLQHVsibqzSW2eDpDE4i0mkrHr6-rkDJxF0C6w2AKbsaSXAeEsiMAhIPMDeSxQLKb7pJWmRkSasScZhKYsHTS2GOOH9DHlljAVzCCyw_h64AZQVvEI55lOinyRUwtOUcZAhPPI3lzya2kjpZlKloRSKW4NQvYJ-0uLig6M0Qs0Ty5V0cpPqYf2x1I9jzKrXKSpkTDIVdxEJrQ09FJc4llsBF1b86ipPKFNNlXFFNpqalDIG7B4xuoxls1SEnxpbEkFjXd8ydFenX16R9gGwRcBh_3JuzolSKsvXHJWEpf-HTsktSt-9Ukt1n_VLxyjA46CRLdjZ0xz9i7xNK3FoFfj93fRfveHOEGqjb-oTF9BjWsSbU-vZVuoYS3nOSbpCpURNJb-r0_KRayy1aTZzmaZrmw3cCr05cN_RlPV11tkXQrn64THdwEm3OJdLDt-8XQ_q-nq_a0YLPMFfwPVSu3oUB-XV95yx_3y8004vkBx6XyIEObE9Lg3ciBpn8LeACs0VPu0Rst_nifa7NmZdfaz28As8LkORMuhs95KyKkZu2zZjHHusJ_FurwYJKxAqUxoZkBg0fpow_DjKVbAkNgIsJgkyyVH9kqnsgH7Yn-pxK0MSWJ3CgBSyKj-nSLCmwuBqQuV3peLKCV9JsCO_STCZ-cPZdOr7t5PbkT8ezQZkS4KpPxz7k9n8ZjqfjKf4cBiQt3z_aDifzCfTsT9Hb382Gt0c_gBD1xLf?type=png)](https://mermaid.live/edit#pako:eNqlVttu2zAM_RVDQN_SILcaqd-KdQMCDCuwri9bhkKxmFioLBmS3C1N8u-jb7Fj2UvW5SW2SB1Sh4eUdyRUDEhAQN9zutE0XkoPf6kBbbxd8ZL9jNVcbrwVV-21Hz-9kFrYKM3BPKwX0oIGY2s3hlYv1IB_7M46kBBTLupVmcYr0B4k3GBm5oNKpe0IuVZCqF_47OBtQDLQHVsibqzSW2eDpDE4i0mkrHr6-rkDJxF0C6w2AKbsaSXAeEsiMAhIPMDeSxQLKb7pJWmRkSasScZhKYsHTS2GOOH9DHlljAVzCCyw_h64AZQVvEI55lOinyRUwtOUcZAhPPI3lzya2kjpZlKloRSKW4NQvYJ-0uLig6M0Qs0Ty5V0cpPqYf2x1I9jzKrXKSpkTDIVdxEJrQ09FJc4llsBF1b86ipPKFNNlXFFNpqalDIG7B4xuoxls1SEnxpbEkFjXd8ydFenX16R9gGwRcBh_3JuzolSKsvXHJWEpf-HTsktSt-9Ukt1n_VLxyjA46CRLdjZ0xz9i7xNK3FoFfj93fRfveHOEGqjb-oTF9BjWsSbU-vZVuoYS3nOSbpCpURNJb-r0_KRayy1aTZzmaZrmw3cCr05cN_RlPV11tkXQrn64THdwEm3OJdLDt-8XQ_q-nq_a0YLPMFfwPVSu3oUB-XV95yx_3y8004vkBx6XyIEObE9Lg3ciBpn8LeACs0VPu0Rst_nifa7NmZdfaz28As8LkORMuhs95KyKkZu2zZjHHusJ_FurwYJKxAqUxoZkBg0fpow_DjKVbAkNgIsJgkyyVH9kqnsgH7Yn-pxK0MSWJ3CgBSyKj-nSLCmwuBqQuV3peLKCV9JsCO_STCZ-cPZdOr7t5PbkT8ezQZkS4KpPxz7k9n8ZjqfjKf4cBiQt3z_aDifzCfTsT9Hb382Gt0c_gBD1xLf)
