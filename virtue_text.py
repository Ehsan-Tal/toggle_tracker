class Virtue:
    """A practice class to create instances of virtues or qualities I otherwise want to induce in myself."""

    def __init__(self, name, desc):
        self.name = name;
        self.desc = desc;

    def __repr__(self):
        return "{}\n - {}\n".format(self.name, self.desc)


virtues = [
('Temperance'  , 'Eat not to dullness. Drink not to elevation.'),
('Silence'     , 'Speak not but what may benefit others or yourself. Avoid trifling conversation.'),
('Order'       , 'Let all your things have their places. Let each part of your business have its time.'),
('Resolution'  , 'Resolve to perform what you ought. Perform without fail what you resolve.'),
('Frugality'   , 'Make no expense but to do good to others or yourself: i.e., Waste nothing.'),
('Industry'    , 'Lose no time. Be always employed in something useful. Cut off all unnecessary actions.'),
('Sincerity'   , 'Use no hurtful deceit. Think innocently and justly; and if you speak, speak accordingly.'),
('Justice'     , 'Wrong none by doing injuries, or omitting the benefits that are your duty.'),
('Moderation'  , 'Avoid extremes. Forbear resenting injuries so much as you think they deserve.'),
('Cleanliness' , 'Tolerate no uncleanness in body, clothes, or habitation.'),
('Tranquility' , 'Be not disturbed at trifles, or at accidents common or unavoidable.'),
('Chastity'    , 'Rarely use venery but for health or offspring; never to dullness, weakness, or the injury of your own or another\'s peace or reputation.'),
('Humility'    , 'Imitate Muhammed, Isa, Socrates, et al.'),
]


if __name__ == '__main__':
    for virtue in virtues:
        name, desc = virtue;
        print(Virtue(name, desc));


else:
    print('This is imported as: ' + __name__)
