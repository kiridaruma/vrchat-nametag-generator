const enum Color {
    Visitor,
    NewUser,
    User,
    Known,
    Trusted,
    Friend
}

const Visitor = Color.Visitor
const NewUser = Color.NewUser
const User = Color.User
const Known = Color.Known
const Trusted = Color.Trusted
const Friend = Color.Friend

const never = (): never => { throw Error() };

export const colors: Color[] = [
    Friend,
    Trusted,
    Known,
    User,
    NewUser,
    Visitor,
]

export const rank = (color: Color): string => {
    switch (color) {
        case Visitor: return "Visitor"
        case NewUser: return "NewUser"
        case User: return "User"
        case Known: return "KnownUser"
        case Trusted: return "TrustedUser"
        case Friend: return "Friend"
        default:
            never()
    }
}

export const colorCode = (color: Color): string => {
    switch (color) {
        case Visitor: return "#CCC"
        case NewUser: return "#1778FF"
        case User: return "#2BCF5C"
        case Known: return "#FF7B42"
        case Trusted: return "#8143E6"
        case Friend: return "yellow"
        default:
            never()
    }
}
