<?php
namespace RomaChe\NewsBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\NewsBundle\Entity\Chmod;
use RomaChe\NewsBundle\Entity\Theme;
use RomaChe\NewsBundle\Entity\Section;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\ORM\EntityManagerInterface;

class LoadUserData implements  FixtureInterface, ContainerAwareInterface
{
    private $container;

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $sectionsArr = array(
          'world news',
          'sport',
          'tech',
          'busines',
          'movies',
          'culture',
          'beauty',
          'books',
          'blogs',
          'staff',
          '+'
        );
        $staffArr = array('admin', 'super');

        $users = $this->container->get('doctrine')->getEntityManager('default')
          ->getRepository(Users::class);

        foreach ($sectionsArr as $value) {
          $section = new Section();

          $section->setName($value);
          $section->setDescription('fixtures generated section for section '. $value);

          $chmod = new Chmod();
          $chmod->setGroupName('SUPER');
          $chmod->setDescription('Section');

          $superUser = $users->findOneBy(array('username' => 'root'));

          if( $value == 'staff' ) {
            $chmod->setChmod(710);
            foreach ($staffArr as $staffValue) {
              $theme = new Theme();
              $theme->setSection($section);
              $theme->setName($staffValue);
              $themeChmod = new Chmod();
              $themeChmod->setChmod(710);
              $themeChmod->setDescription('Theme');
              $themeChmod->setGroupName('SUPER');
              $themeChmod->setAuthor($superUser);
              $manager->persist($themeChmod);
              $theme->setChmod($themeChmod);

              $manager->persist($theme);
              $section->addTheme($theme);
            }

          } else {
            $chmod->setChmod( $value == '+' ? 500 : 744);
          }

          $chmod->setAuthor($superUser);
          $manager->persist($chmod);

          $section->setChmod($chmod);
          $manager->persist($section);
        }
        $manager->flush();

    }

    /**
     * Sets the container.
     *
     * @param ContainerInterface|null $container A ContainerInterface instance or null
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
