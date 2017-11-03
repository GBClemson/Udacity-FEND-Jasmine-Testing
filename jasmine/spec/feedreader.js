/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URL defined that is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

         it('has name defined that is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The Menu', function() {
        // created variable for expectedMenuClass so that it is easier to test if that CSS class name changes     
        var expectedMenuClass = 'menu-hidden';
        
        it('is hidden by default', function() {
            expect($('body').hasClass(expectedMenuClass)).toBe(true);
        });        

        describe('button is being clicked', function() {
            
            it('and should be visible when clicked', function() {              
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass(expectedMenuClass)).toBe(false);
            });

            it('and not visible when clicked again', function() {
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass(expectedMenuClass)).toBe(true);
            });  

        });
    });

    describe('Initial Entries', function() {
        
        var feedEntry;
        
        beforeEach(function(done) {
            // setTimeout to ensure that the feeds can load
            setTimeout(function() {
                // load the first available feed
                loadFeed(0, function() {
                    done();              
                });
            }, 10);
        });       
        
        it('there is at least one .entry element within this .feed', function(done) {           
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });    
    });

    describe('New Feed Selection', function() {

        var thisFeed, thatFeed;
        
        beforeEach(function(done) {
            // setTimeout to ensure that the feeds can load
            setTimeout(function() {
                // load the first available feed
                loadFeed(0, function() {
                    thisFeed = $('.feed').html();
                    // load the second available feed
                    loadFeed(1, function() {
                        thatFeed = $('.feed').html();
                        done();                
                    });              
                });
                
            }, 10);
        });

        it('new feed is different', function() {              
            expect(thisFeed).not.toEqual(thatFeed);
        });
    });

}());