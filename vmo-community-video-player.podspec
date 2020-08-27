require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "vmo-community-video-player"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/react-native-vmo-video-player/vmo-community-video-player.git", :tag => "#{s.version}" }
  
  s.source_files = "ios/**/*.{h,m,mm}"

  s.subspec "VideoCaching" do |ss|
    ss.dependency "SPTPersistentCache", "~> 1.1.0"
    ss.dependency "DVAssetLoaderDelegate", "~> 0.3.1"
    ss.source_files = "ios/VideoCaching/**/*.{h,m}"
    s.static_framework = true
  end

  s.dependency "React"
   s.xcconfig = {
    'OTHER_LDFLAGS': '-ObjC',
  }
end
