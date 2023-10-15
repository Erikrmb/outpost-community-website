import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding');

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    });
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No result</p>
                ) : (
                    <>
                        {result.users.map((resultUser) => (
                            <UserCard
                                key={resultUser.id}
                                id={resultUser.id}
                                name={resultUser.name}
                                username={resultUser.username}
                                imgUrl={resultUser.image}
                                entityType='User'
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}
