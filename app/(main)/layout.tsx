import Provider from "./provider";


export default function WorkSpaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return(
        <div>
            <Provider>
                {children}
            </Provider>
        </div>
    )
}