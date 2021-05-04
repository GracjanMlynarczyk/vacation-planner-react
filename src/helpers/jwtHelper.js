export function jwtDecode(token) {
    //TODO - implement jwtdecode
    if (token) {
        return {
            id: 1,
            email: "gracjan.mlynarczyk@codetain.com",
            firstName: "Gracjan",
            lastName: "Młynarczyk",
            canAcceptProposal: true,
            canShowAllProposals: true,
            isAdmin: true
        }
    } else {
        return null;
    }
}