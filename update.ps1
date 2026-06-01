$content = Get-Content -Raw "preview-enhanced.html"

# Replace Buttons
$content = $content -replace "onclick=`"showBooking\(\)`".*?🎫 Book", "onclick=`"showBooking('Web Design Workshop', 25)`"`n                                        class=`"px-6 py-2 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95 shadow-lg transition-all duration-200 btn-hover btn-active`">`n                                        Book Now"
# Wait, replacing everything is tricky with regex if not careful. Let's do exact replaces for each one.
