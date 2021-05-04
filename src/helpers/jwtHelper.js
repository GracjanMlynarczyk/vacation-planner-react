export function jwtDecode(token) {
    //TODO - implement jwtdecode
    if (token) {
        return {
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