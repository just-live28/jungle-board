import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "Jungle-Board",
            credentials: {
                id: { label: "ID", type: "text" },
                password: { label: "비밀번호", type: "password" },
            },

            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고 
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
                let db = (await connectDB).db('board');
                let user = await db.collection('user').findOne({ userId: credentials.id })
                if (!user) {
                    return null
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    return null
                }
                return user
            }
        })
    ],

    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },


    callbacks: {
        //4. jwt 만들 때 실행되는 코드 
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name
                token.user.userId = user.userId
                token.user.role = user.role
            }
            return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/signin',
    },
};
export default NextAuth(authOptions); 