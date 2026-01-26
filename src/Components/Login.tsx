import logo from '../assets/Logo.svg'

export function Login(){
    return(
        <div className="min-h-screen to-emerald-600 flex flex-col items-center justify-center p-4">
            <img src={logo} alt="Logo" className="w-60 h-20 mb-8" />
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Welcome back! Please sign in to your account</p>
                </div>
                
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-4/5 px-4 py-4 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 placeholder-gray-400"
                            style={{borderRadius: '5px'}}
                            placeholder="admin@example.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-4/5 px-4 py-4 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 placeholder-gray-400"
                            style={{borderRadius: '5px'}}
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        <label className="flex items-center ml-0" style={{marginLeft: '10%'}}>
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium" style={{marginRight: '10%'}}>Forgot password?</a>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-4/5 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white font-semibold py-4 px-4 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        style={{borderRadius: '5px', paddingTop: '5px', paddingBottom: '5px'}}
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Need help? <a href="#" className="text-green-600 hover:text-green-800 font-medium">Contact Support</a></p>
                </div>
            </div>
        </div>
    )
}